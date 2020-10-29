const level = location.search.slice(7);  //難易度をURLパラメータから取得

const CLASSES = {0:'あ', 1:'い', 2:'う', 3:'え', 4:'お',
				 5:'か', 6:'き', 7:'く', 8:'け', 9:'こ',
				 10:'さ', 11:'し', 12:'す', 13:'せ', 14:'そ',
				 15:'た', 16:'ち', 17:'つ', 18:'て', 19:'と',
				 20:'な', 21:'に', 22:'ぬ', 23:'ね', 
				 24:'は', 25:'ひ', 26:'ふ', 27:'へ', 28:'ほ',
				 29:'ま', 30:'み', 31:'む', 32:'め', 33:'も',
				 34:'や', 35:'ゆ', 36:'よ',
				 37:'ら', 38:'る', 39:'れ', 40:'ろ',
				 41:'わ'}

let vocab;  //問題の単語

if(level == '1') {
	vocab = [
		'あめ','いぬ','うし','えき','おか',
		'かみ','きく','くせ','けさ','こま',
		'さる','しか','すし','せみ','そら',
		'たき','つき','てら','とし',
		'なみ','にく','ぬま','ねこ',
		'はし','ひな','ふね','へた','ほか',
		'また','みき','むし','めか','もか',
		'やま','ゆみ','よる','らめ','るす','れあ','ろか',
		'わに'
	];
}

else if(level == '2') {
	vocab = [
		'あした','いるか','うしろ','えすて','おうむ',
		'からす','きつね','くるみ','けいと','こあら',
		'さくら','しまね','すみれ','せなか','そふと',
		'たぬき','ちくわ','つみき','てにす','といれ',
		'なかみ','にもつ','ぬるい','ねむい',
		'はなし','ひなた','ふつう','へちま','ほそい',
		'まいく','みなみ','むすめ','めいし','すもう',
		'やすみ','ゆみや','よわい',
		'からい','ひるま','れきし','ろしあ',
		'わるい'
	];
}

else if(level == '3') {
	vocab = [
		'けいこうとう','まかろん','ゆうえんち','あさくさえき','いすらえる',
		'ういるす','えきたい','おつかれ','かすてら','きたきつね',
		'くるまいす','けいさつ','こうこう','さいたま','しまうま',
		'すいとう','せれくと','そういくふう','たいふう','ちかそうこ',
		'ついとう','といあわせ','おはなみ','にちよう','ぬるまゆ',
		'ねるまもおしむ','はいけい','ひるやすみ','ふろしき','へいかいしき',
		'ほしうらない','まいにち','おみまい','むらさき','かきとめ',
		'いもうと','やわらかい','ゆうめい','たいよう','おわらい',
		'うるさい','れいあうと','おもしろい','わいやれす'
	];
}

else location.href = 'index.html';  //URLがおかしい場合はメニューにとぶ

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let hand_model = null;  //手を検出するモデル
let class_model = null;  //指文字を分類するモデル
let tensor_image = null;  //入力画像の行列

const modelParams = {
    flipHorizontal: true,  // flip e.g for video
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,     // ioU threshold for non-max suppression
    scoreThreshold: 0.7,   // confidence threshold for predictions.
}

//モデル読み込み
handTrack.load(modelParams).then(l_model => {
    hand_model = l_model;
	load_class_model();
	$("#status").text("Model Loaded !")
	startVideo();
});

//指文字分類器のモデル
async function load_class_model() {
	class_model = await tf.loadLayersModel(`https://raw.githubusercontent.com/IEHOKADO/Shuwagate/main/model/model.json`);
};

//ビデオの開始
function startVideo() {
    handTrack.startVideo(video).then(function (status) {
		$("#status").remove();
		main();
    });
}

//メインの処理
function main() {
	classify(get_tensor());  //手を検出して指文字を分類する
	requestAnimationFrame(main);  //繰り返し処理
}

//手だけを取得する
function get_tensor(){
    hand_model.detect(video).then(predictions => {
        if(predictions.length != 0) {
			//枠の拡張
			predictions[0]['bbox'][0] -= 50;
			predictions[0]['bbox'][1] -= 50;
			predictions[0]['bbox'][2] += 100;
			predictions[0]['bbox'][3] += 100;
			//座標と長さの取得
			let x = predictions[0]['bbox'][0];
			let y = predictions[0]['bbox'][1];
			let w = predictions[0]['bbox'][2];
			let h = predictions[0]['bbox'][3];
			let image = context.getImageData(x, y, w, h);
			tensor_image = preprocessImage(image);  //手だけを入力にする
		}
		else {
			tensor_image = preprocessImage(video);  //手を検出できなかった時はビデオを入力にする
		}
		hand_model.renderPredictions(predictions, canvas, context, video);  //枠の描画
    });
    return tensor_image;
}

//指文字の分類
async function classify(tensor_image){
	let prediction = await class_model.predict(tensor_image).data();
	let results = Array.from(prediction).map(function(p,i){
        return {probability: p,className: CLASSES[i]};
	}).sort(function(a,b){
		return b.probability-a.probability;
	}).slice(0,5);
	other(results);
};

//前処理
function preprocessImage(image){
	let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([100,100]).toFloat();	
	let offset = tf.scalar(255);
    return tensor.div(offset).expandDims();
}

//その他の処理
let status = true;  //処理が可能か判断する
let score = 0;  //正解数
let idx = 0;  //色を変える文字の番号
let cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];  //テキストはランダムで決める
//cpText='ち'
$("#question").html(cpText.replace(/(\S)/g, "<span>$&</span>"));
function other(results){
	if(!status) return;
	$("#console").empty();
	results.forEach(function(p) {
		//コンソールにクラスと確率を表示
		$("#console").append('<div>・'+p.className+' : '+(p.probability*100).toFixed(2)+'%</div>');
		if(p.probability.toFixed(2) > 0.01 && p.className == cpText[idx]){
			$("#question span:nth-child(" + (idx+1) + ")").css({'color':'white'});
			idx++;
		}
		if(idx == cpText.length) {
			score++;
			idx = 0;  //番号をリセット
			if(score == 3) {
				status = false;  //処理をやめる
				swal.fire({
					title: "レッスンクリア！",
					icon: "success",
				}).then(function() {
					location.href = 'index.html';
				});
			}
			else{
				swal.fire({
					title: score + "/3",
					icon: "success",
					timer: 1000,
					showConfirmButton: false,
				});
				cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];  //テキストはランダムで決める
				//cpText='ち'
				$("#question").html(cpText.replace(/(\S)/g, "<span>$&</span>"));
			}
		}
	});
}

$("#yubimoji").click(function() {
	$("#modal").fadeIn();  //モーダルを表示
})

$(".modal-close").click(function() {
	$("#modal").fadeOut();  //モーダルを非表示
})
