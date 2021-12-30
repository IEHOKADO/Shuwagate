const level = location.search.slice(7);

let vocab;

if (level == '1') {
	vocab = [['あか', 'reading_level1/aka'],
	['あさ', 'reading_level1/asa'],
	['いぬ', 'reading_level1/inu'],
	['うし', 'reading_level1/ushi'],
	['えき', 'reading_level1/eki'],
	['かみ', 'reading_level1/kami'],
	['きく', 'reading_level1/kiku'],
	['こま', 'reading_level1/koma'],
	['さる', 'reading_level1/saru'],
	['しか', 'reading_level1/shika'],
	['すし', 'reading_level1/sushi'],
	['せみ', 'reading_level1/semi'],
	['そら', 'reading_level1/sora'],
	['たき', 'reading_level1/taki'],
	['ちち', 'reading_level1/titi'],
	['つき', 'reading_level1/tsuki'],
	['てら', 'reading_level1/tera'],
	['とり', 'reading_level1/tori'],
	['なみ', 'reading_level1/nami'],
	['にく', 'reading_level1/niku'],
	['ぬま', 'reading_level1/numa'],
	['ねこ', 'reading_level1/neko'],
	['のり', 'reading_level1/nori'],
	['はし', 'reading_level1/hashi'],
	['ひな', 'reading_level1/hina'],
	['ふね', 'reading_level1/hune'],
	['へり', 'reading_level1/heri'],
	['ほん', 'reading_level1/honn'],
	['まり', 'reading_level1/mari'],
	['みの', 'reading_level1/mino'],
	['むし', 'reading_level1/mushi'],
	['めま', 'reading_level1/numa'],
	['もも', 'reading_level1/momo'],
	['やり', 'reading_level1/yari'],
	['ゆみ', 'reading_level1/yumi'],
	['よる', 'reading_level1/yoru'],
	['らめ', 'reading_level1/rame'],
	['わに', 'reading_level1/wani'],
	['もり', 'reading_level1/mori'],
	['かに', 'reading_level1/kani'],
	['りす', 'reading_level1/risu'],
	['おか', 'reading_level1/oka'],
	['いす', 'reading_level1/isu'],
	['うま', 'reading_level1/uma'],
	['やま', 'reading_level1/yama']];
}

else if (level == '2') {
	vocab = [['あんこ', 'reading_level2/anko'],
	['いるか', 'reading_level2/iruka']
	['うさぎ', 'reading_level2/usagi'],
	['うなぎ', 'reading_level2/unagi'],
	['えのぐ', 'reading_level2/enogu'],
	['おうむ', 'reading_level2/oumu'],
	['からす', 'reading_level2/karasu'],
	['きりん', 'reading_level2/kirin'],
	['くるみ', 'reading_level2/kurumi'],
	['けいと', 'reading_level2/keito'],
	['こあら', 'reading_level2/koara'],
	['さくら', 'reading_level2/sakura'],
	['しまね', 'reading_level2/shimane'],
	['すみれ', 'reading_level2/sumire'],
	['せなか', 'reading_level2/senaka'],
	['そふと', 'reading_level2/sohuto'],
	['たぬき', 'reading_level2/tanuki'],
	['ちくわ', 'reading_level2/tikuwa'],
	['つみき', 'reading_level2/tumiki'],
	['てにす', 'reading_level2/tenisu'],
	['といれ', 'reading_level2/toire'],
	['なみだ', 'reading_level2/namida'],
	['にしん', 'reading_level2/nishin'],
	['ぬりえ', 'reading_level2/nurie'],
	['ねずみ', 'reading_level2/nezumi'],
	['のーと', 'reading_level2/no-to'],
	['はなし', 'reading_level2/hanashi'],
	['ぷりん', 'reading_level2/purin'],
	['へちま', 'reading_level2/hetima'],
	['ほらー', 'reading_level2/hora-'],
	['まっと', 'reading_level2/matto'],
	['むすめ', 'reading_level2/musume'],
	['めろん', 'reading_level2/meron'],
	['もみじ', 'reading_level2/momizi'],
	['やすみ', 'reading_level2/yasumi'],
	['ゆみや', 'reading_level2/yumiya'],
	['よっと', 'reading_level2/yotto'],
	['らっこ', 'reading_level2/rakko'],
	['わいん', 'reading_level2/wain'],
	['きつね', 'reading_level2/kitune'],
	['かばん', 'reading_level2/kaban'],
	['れもん', 'reading_level2/remon'],
	['ろしあ', 'reading_level2/roshia']];
}

else if (level == '3') {
	vocab = [['あめんぼ', 'reading_level3/amenbo'],
	['いめーじ', 'reading_level3/ime-zi']
	['うらぎり', 'reading_level3/uragiri'],
	['えたのーる', 'reading_level3/etano-ru'],
	['おんがく', 'reading_level3/ongaku'],
	['かっぱ', 'reading_level3/kappa'],
	['きおくりょく', 'reading_level3/kiokuryoku'],
	['くるーざー', 'reading_level3/kuru-za-'],
	['けいこうとう', 'reading_level3/keikoutou'],
	['こっぱみじん', 'reading_level3/koppamizin'],
	['さいきょう', 'reading_level3/saikyou'],
	['しっぱい', 'reading_level3/sippai'],
	['すいぞくかん', 'reading_level3/suizokukan'],
	['せんぱい', 'reading_level3/senpai'],
	['そふとうぇあ', 'reading_level3/sohutoulea'],
	['たっきゅう', 'reading_level3/takkyuu'],
	['ちぇっく', 'reading_level3/tyekku'],
	['ついったー', 'reading_level3/tuitta-'],
	['てぃっしゅ', 'reading_level3/telissyu'],
	['とっぷ', 'reading_level3/toppu'],
	['なぞとき', 'reading_level3/nazotoki'],
	['にんじん', 'reading_level3/ninnzin'],
	['ぬいぐるみ', 'reading_level3/nuigurumi'],
	['ねがてぃぶ', 'reading_level3/negatelibu'],
	['のうぎょう', 'reading_level3/nougyou'],
	['はいきんぐ', 'reading_level3/haikinngu'],
	['ひえしょう', 'reading_level3/hiesyou'],
	['ぷらすちっく', 'reading_level3/purasutikku'],
	['べんきょう', 'reading_level3/bennkyou'],
	['ほうこくしょ', 'reading_level3/houkokusyo'],
	['まかろん', 'reading_level3/makaron'],
	['みずたまり', 'reading_level3/mizutamari'],
	['むーびー', 'reading_level3/mu-bi-'],
	['めいきんぐ', 'reading_level3/meikingu'],
	['もぎてん', 'reading_level3/mogiten'],
	['やじるし', 'reading_level3/yazirusi'],
	['ゆうえんち', 'reading_level3/yuuenti'],
	['ようきゅう', 'reading_level3/youkyuu'],
	['らっぱ', 'reading_level3/rappa'],
	['りあくしょん', 'reading_level3/riakusyon'],
	['るすばん', 'reading_level3/rusuban'],
	['れんたかー', 'reading_level3/rentaka-'],
	['わいふぁい', 'reading_level3/waifai'],
	['ばらんす', 'reading_level3/baransu'],
	['ぱぷりか', 'reading_level3/papurika'],
	['ぴくにっく', 'reading_level3/pikunikku'],
	['ぺっとぼとる', 'reading_level3/pettobotoru']];
}

else location.href = 'index.html';

let status = true;
let score = 0;
let answer;
function main() {
	if (status) {
		let usrText = $('#textInput').val();
		$('#textInput').val('');
		if (usrText == answer) {
			score++;
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
				let ram = Math.floor(Math.random() * Math.floor(vocab.length));
				answer = vocab[ram][0];
				$('#video-reading').html('<video controls src="../video/' + vocab[ram][1] + '.mp4" type="video/mp4" width="800px" height="600px"></video>');
			}
		}
		else {
			swal.fire({
				title: '不正解！',
				icon: 'error',
				timer: 1000,
				showConfirmButton: false,
			});
		}
	}
}

function init() {
	let ram = Math.floor(Math.random() * Math.floor(vocab.length));
	answer = vocab[ram][0];
	$('#video-reading').html('<video controls src="../video/' + vocab[ram][1] + '.mp4" type="video/mp4" width="800px" height="600px"></video>');
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

$('#textInput').keypress(function (e) {
	if ((e.which == 13) && document.getElementById('textInput').value != '') main();
});

$('#buttonInput').click(function () {
	if (document.getElementById('textInput').value != '') main();
});
