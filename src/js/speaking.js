const level = location.search.slice(7);

const CLASSES = {
	0: 'あ', 1: 'い', 2: 'う', 3: 'え', 4: 'お',
	5: 'か', 6: 'き', 7: 'く', 8: 'け', 9: 'こ',
	10: 'さ', 11: 'し', 12: 'す', 13: 'せ', 14: 'そ',
	15: 'た', 16: 'ち', 17: 'つ', 18: 'て', 19: 'と',
	20: 'な', 21: 'に', 22: 'ぬ', 23: 'ね',
	24: 'は', 25: 'ひ', 26: 'ふ', 27: 'へ', 28: 'ほ',
	29: 'ま', 30: 'み', 31: 'む', 32: 'め', 33: 'も',
	34: 'や', 35: 'ゆ', 36: 'よ',
	37: 'ら', 38: 'る', 39: 'れ', 40: 'ろ',
	41: 'わ'
}

let vocab;

if (level == '1') {
	// 'た'の認識精度がわるいため、'たき', 'へた', 'また' は除外
	vocab = [
		'あめ', 'いぬ', 'うし', 'えき', 'おか',
		'かみ', 'きく', 'くせ', 'けさ', 'こま',
		'さる', 'しか', 'すし', 'せみ', 'そら',
		'つき', 'てら', 'とし',
		'なみ', 'にく', 'ぬま', 'ねこ',
		'はし', 'ひな', 'ふね', 'ほか',
		'みき', 'むし', 'めか', 'もか',
		'やま', 'ゆみ', 'よる', 'らめ', 'るす', 'れあ', 'ろか',
		'わに'
	];
}

else if (level == '2') {
	// 'た'の認識精度がわるいため、'あした', 'たぬき', 'ひなた' は除外
	vocab = [
		'いるか', 'うしろ', 'えすて', 'おうむ',
		'からす', 'きつね', 'くるみ', 'けいと', 'こあら',
		'さくら', 'しまね', 'すみれ', 'せなか', 'そふと',
		'ちくわ', 'つみき', 'てにす', 'といれ',
		'なかみ', 'にもつ', 'ぬるい', 'ねむい',
		'はなし', 'ふつう', 'へちま', 'ほそい',
		'まいく', 'みなみ', 'むすめ', 'めいし', 'すもう',
		'やすみ', 'ゆみや', 'よわい',
		'からい', 'ひるま', 'れきし', 'ろしあ',
		'わるい'
	];
}

else if (level == '3') {
	// 'た'の認識精度がわるいため、'えきたい', 'きたきつね', 'さいたま', 'たいふう', 'たいよう' は除外
	vocab = [
		'けいこうとう', 'まかろん', 'ゆうえんち', 'あさくさえき', 'いすらえる',
		'ういるす', 'おつかれ', 'かすてら',
		'くるまいす', 'けいさつ', 'こうこう', 'しまうま',
		'すいとう', 'せれくと', 'そういくふう', 'ちかそうこ',
		'ついとう', 'といあわせ', 'おはなみ', 'にちよう', 'ぬるまゆ',
		'ねるまもおしむ', 'はいけい', 'ひるやすみ', 'ふろしき', 'へいかいしき',
		'ほしうらない', 'まいにち', 'おみまい', 'むらさき', 'かきとめ',
		'いもうと', 'やわらかい', 'ゆうめい', 'おわらい',
		'うるさい', 'れいあうと', 'おもしろい', 'わいやれす'
	];
}

else location.href = 'index.html';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let hand_model;
let class_model;
let tensor_image;
let cpText;

async function load_class_model() {
	class_model = await tf.loadLayersModel(`https://raw.githubusercontent.com/IEHOKADO/Shuwagate/main/model/model.json`);
}

// const canvas_check = document.getElementById('canvas-check');	// check
// const context_check = canvas_check.getContext('2d');			// check
function preprocessImage(image) {
	let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([100, 100]).toFloat();
	let offset = tf.scalar(255);
	// tf.browser.toPixels(tensor.div(offset), canvas_check);		// check
	return tensor.div(offset).expandDims();
}

function get_tensor() {
	hand_model.detect(video).then(predictions => {
		if (predictions.length != 0) {
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
			tensor_image = preprocessImage(image);
		}
		else {
			tensor_image = preprocessImage(video);
		}
		hand_model.renderPredictions(predictions, canvas, context, video);
	});
	return tensor_image;
}

async function classify(tensor_image) {
	let prediction = await class_model.predict(tensor_image).data();
	let results = Array.from(prediction).map(function (p, i) {
		return { probability: p, className: CLASSES[i] };
	}).sort(function (a, b) {
		return b.probability - a.probability;
	}).slice(0, 10);
	other(results);
}

let status = true;
let score = 0;
let idx = 0;
function other(results) {
	if (!status) return;
	$('#console').empty();
	results.forEach(function (p) {
		$('#console').append('<div>・' + p.className + ' : ' + p.probability.toFixed(3) + '</div>');
		if (p.probability.toFixed(3) > 0.100 && p.className == cpText[idx]) {
			$('#question span:nth-child(' + (idx + 1) + ')').css({ 'color': 'white' });
			idx++;
		}
		if (idx == cpText.length) {
			score++;
			idx = 0;
			if (score == 3) {
				status = false;
				swal.fire({
					title: 'レッスンクリア！',
					icon: 'success',
				}).then(function () {
					location.href = 'index.html';
				});
			}
			else {
				swal.fire({
					title: score + '/3',
					icon: 'success',
					timer: 1000,
					showConfirmButton: false,
				});
				cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];
				$('#question').html(cpText.replace(/(\S)/g, '<span>$&</span>'));
			}
		}
	});
}

function main() {
	classify(get_tensor());
	requestAnimationFrame(main);
}

function init() {
	const modelParams = {
		flipHorizontal: true,  // flip e.g for video
		maxNumBoxes: 1,        // maximum number of boxes to detect
		iouThreshold: 0.5,     // ioU threshold for non-max suppression
		scoreThreshold: 0.7,   // confidence threshold for predictions.
	}
	handTrack.load(modelParams).then(model => {
		hand_model = model
		load_class_model();
		$('#status').text('準備完了 !');
		handTrack.startVideo(video).then(function (status) {
			if (status) {
				$('#window1').hide();
				$('#window2').show();
				cpText = vocab[Math.floor(Math.random() * Math.floor(vocab.length))];
				$('#question').html(cpText.replace(/(\S)/g, '<span>$&</span>'));
				main();
			}
			else {
				$('#status').text('カメラが見つかりませんでした');
			}
		});
	});
}

$('#hint').click(function () {
	$('#modal').show();
});

$('#modal-close').click(function () {
	$('#modal').hide();
});

$('#start').click(function () {
	$('#window0').hide();
	$('#window1').show();
	init();
});
