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

const vocab = [
	'あめ','いぬ','うし','えき','おか',
	'かみ','きく','くせ','けさ','こま',
	'さる','しか','すし','せみ','そら',
	'たき','つき','てら','とし',
	'なみ','にく','ぬま','ねこ',
	'はし','ひな','ふね','へた','ほか',
	'また','みき','むし','めか','もか',
	'やま','ゆみ','よる','らめ','るす','れあ','ろか',
	'わに'
]

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isVideo = false;  //ビデオが起動しているか
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
	toggleVideo();
});

//指文字分類器のモデル
async function load_class_model() {
	class_model = await tf.loadLayersModel(`https://raw.githubusercontent.com/IEHOKADO/Shuwagate/master/model/model.json`);
};

//ビデオの開始
function toggleVideo() {
    if (!isVideo) {
        startVideo();
    }
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        if (status) {
            isVideo = true;
			$("#status").remove();
			setInterval(counting,1000);
			main();
        }
    });
}

function main() {
	classify(get_tensor());  //手を検出して指文字を分類する
	requestAnimationFrame(main);  //繰り返し処理
}

//手だけを取得する
function get_tensor(){
    hand_model.detect(video).then(predictions => {
        if(predictions.length != 0) {
			predictions[0]['bbox'][0] -= 50;
			predictions[0]['bbox'][1] -= 50;
			predictions[0]['bbox'][2] += 100;
			predictions[0]['bbox'][3] += 100;
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
	}).slice(0,10);
	other(results);
};

//前処理
function preprocessImage(image){
	let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([100,100]).toFloat();	
	let offset = tf.scalar(255);
    return tensor.div(offset).expandDims();
}

let status = true;
let exp = 1;
let score = 0;
let idx = 0;  //色を変える文字の番号
let cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];  //テキストはランダムで決める
//cpText='お'
$("#question").html(cpText.replace(/(\S)/g, "<span>$&</span>"));
$("#score").text(score + ' / 5');
async function other(results) {
	if(!status) return;
	$("#console").empty();
	results.forEach(function(p) {
		$("#console").append('<div>・'+p.className+' : '+(p.probability*100).toFixed(2)+'%</div>');
		if(p.probability.toFixed(2) > 0.01 && p.className == cpText[idx]){
			$("#question span:nth-child(" + (idx+1) + ")").css({'color':'white'});
			idx++;
		}
		if(idx == cpText.length) {
			score++;
			idx = 0;  //色を変える文字の番号
			cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];  //テキストはランダムで決める
			//cpText='お'
			$("#question").html(cpText.replace(/(\S)/g, "<span>$&</span>"));
		}
	});
};

let now = 0;
let deadline = 60;
function counting() {
	if(now == deadline) {
		status = false;  //処理をやめる
		swal.fire({
			title: "ステージクリア！",
			text: score + "問クリアしました！",
			icon: "success",
		}).then(function() {
			location.href = 'index.html';
		});
		now = -1;
	}
	if(now >= 0 && now < deadline) {
		now++;
		//console.log(deadline-(now));
		$("#progress").css({'width':(100*(deadline-now)/deadline)+'%'});
	}
};

$("#yubimoji").click(function() {
	$("#modal").fadeIn();
})

$(".modal-close").click(function() {
	$("#modal").fadeOut();
})
