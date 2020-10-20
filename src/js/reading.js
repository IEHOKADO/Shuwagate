const level = location.search.slice(7);  //難易度をURLパラメータから取得

let vocab;  //問題の単語
let exp;  //クリア時にもらえるレベル

if(level == '1') {
	vocab = [['あか','../video/reading_level1/aka.mp4'],
			['あさ','../video/reading_level1/asa.mp4'],
			['いぬ','../video/reading_level1/inu.mp4'],
			['うし','../video/reading_level1/ushi.mp4'],
			['えき','../video/reading_level1/eki.mp4'],
			['かみ','../video/reading_level1/kami.mp4'],
			['きく','../video/reading_level1/kiku.mp4'],
			['こま','../video/reading_level1/koma.mp4'],
			['さる','../video/reading_level1/saru.mp4'],
			['しか','../video/reading_level1/shika.mp4'],
			['すし','../video/reading_level1/sushi.mp4'],
			['せみ','../video/reading_level1/semi.mp4'],
			['そら','../video/reading_level1/sora.mp4'],
			['たき','../video/reading_level1/taki.mp4'],
			['ちち','../video/reading_level1/titi.mp4'],
			['つき','../video/reading_level1/tsuki.mp4'],
			['てら','../video/reading_level1/tera.mp4'],
			['とり','../video/reading_level1/tori.mp4'],
			['なみ','../video/reading_level1/nami.mp4'],
			['にく','../video/reading_level1/niku.mp4'],
			['ぬま','../video/reading_level1/numa.mp4'],
			['ねこ','../video/reading_level1/neko.mp4'],
			['のり','../video/reading_level1/nori.mp4'],
			['はし','../video/reading_level1/hashi.mp4'],
			['ひな','../video/reading_level1/hina.mp4'],
			['ふね','../video/reading_level1/hune.mp4'],
			['へり','../video/reading_level1/heri.mp4'],
			['ほん','../video/reading_level1/honn.mp4'],
			['まり','../video/reading_level1/mari.mp4'],
			['みの','../video/reading_level1/mino.mp4'],
			['むし','../video/reading_level1/mushi.mp4'],
			['めま','../video/reading_level1/numa.mp4'],
			['もも','../video/reading_level1/momo.mp4'],
			['やり','../video/reading_level1/yari.mp4'],
			['ゆみ','../video/reading_level1/yumi.mp4'],
			['よる','../video/reading_level1/yoru.mp4'],
			['らめ','../video/reading_level1/rame.mp4'],
			['わに','../video/reading_level1/wani.mp4'],
			['もり','../video/reading_level1/mori.mp4'],
			['かに','../video/reading_level1/kani.mp4'],
			['りす','../video/reading_level1/risu.mp4'],
			['おか','../video/reading_level1/oka.mp4'],
			['いす','../video/reading_level1/isu.mp4'],
			['うま','../video/reading_level1/uma.mp4'],
			['やま','../video/reading_level1/yama.mp4']];
	exp = 1;
}

else if(level == '2') {
	vocab = [['あんこ','../video/reading_level2/anko.mp4'],
			['いるか','../video/reading_level2/iruka.mp4']
			['うさぎ','../video/reading_level2/usagi.mp4'],
			['うなぎ','../video/reading_level2/unagi.mp4'],
			['えのぐ','../video/reading_level2/enogu.mp4'],
			['おうむ','../video/reading_level2/oumu.mp4'],
			['からす','../video/reading_level2/karasu.mp4'],
			['きりん','../video/reading_level2/kirin.mp4'],
			['くるみ','../video/reading_level2/kurumi.mp4'],
			['けいと','../video/reading_level2/keito.mp4'],
			['こあら','../video/reading_level2/koara.mp4'],
			['さくら','../video/reading_level2/sakura.mp4'],
			['しまね','../video/reading_level2/shimane.mp4'],
			['すみれ','../video/reading_level2/sumire.mp4'],
			['せなか','../video/reading_level2/senaka.mp4'],
			['そふと','../video/reading_level2/sohuto.mp4'],
			['たぬき','../video/reading_level2/tanuki.mp4'],
			['ちくわ','../video/reading_level2/tikuwa.mp4'],
			['つみき','../video/reading_level2/tumiki.mp4'],
			['てにす','../video/reading_level2/tenisu.mp4'],
			['といれ','../video/reading_level2/toire.mp4'],
			['なみだ','../video/reading_level2/namida.mp4'],
			['にしん','../video/reading_level2/nishin.mp4'],
			['ぬりえ','../video/reading_level2/nurie.mp4'],
			['ねずみ','../video/reading_level2/nezumi.mp4'],
			['のーと','../video/reading_level2/no-to.mp4'],
			['はなし','../video/reading_level2/hanashi.mp4'],
			['ぷりん','../video/reading_level2/purin.mp4'],
			['へちま','../video/reading_level2/hetima.mp4'],
			['ほらー','../video/reading_level2/hora-.mp4'],
			['まっと','../video/reading_level2/matto.mp4'],
			['むすめ','../video/reading_level2/musume.mp4'],
			['めろん','../video/reading_level2/meron.mp4'],
			['もみじ','../video/reading_level2/momizi.mp4'],
			['やすみ','../video/reading_level2/yasumi.mp4'],
			['ゆみや','../video/reading_level2/yumiya.mp4'],
			['よっと','../video/reading_level2/yotto.mp4'],
			['らっこ','../video/reading_level2/rakko.mp4'],
			['わいん','../video/reading_level2/wain.mp4'],
			['きつね','../video/reading_level2/kitune.mp4'],
			['かばん','../video/reading_level2/kaban.mp4'],
			['れもん','../video/reading_level2/remon.mp4'],
			['ろしあ','../video/reading_level2/roshia.mp4']];
	exp = 2;
}

else if(level == '3') {
	vocab = [['あめんぼ','../video/reading_level3/amenbo.mp4'],
			['いめーじ','../video/reading_level3/ime-zi.mp4']
			['うらぎり','../video/reading_level3/uragiri.mp4'],
			['えたのーる','../video/reading_level3/etano-ru.mp4'],
			['おんがく','../video/reading_level3/ongaku.mp4'],
			['かっぱ','../video/reading_level3/kappa.mp4'],
			['きおくりょく','../video/reading_level3/kiokuryoku.mp4'],
			['くるーざー','../video/reading_level3/kuru-za-.mp4'],
			['けいこうとう','../video/reading_level3/keikoutou.mp4'],
			['こっぱみじん','../video/reading_level3/koppamizin.mp4'],
			['さいきょう','../video/reading_level3/saikyou.mp4'],
			['しっぱい','../video/reading_level3/sippai.mp4'],
			['すいぞくかん','../video/reading_level3/suizokukan.mp4'],
			['せんぱい','../video/reading_level3/senpai.mp4'],
			['そふとうぇあ','../video/reading_level3/sohutoulea.mp4'],
			['たっきゅう','../video/reading_level3/takkyuu.mp4'],
			['ちぇっく','../video/reading_level3/tyekku.mp4'],
			['ついったー','../video/reading_level3/tuitta-.mp4'],
			['てぃっしゅ','../video/reading_level3/telissyu.mp4'],
			['とっぷ','../video/reading_level3/toppu.mp4'],
			['なぞとき','../video/reading_level3/nazotoki.mp4'],
			['にんじん','../video/reading_level3/ninnzin.mp4'],
			['ぬいぐるみ','../video/reading_level3/nuigurumi.mp4'],
			['ねがてぃぶ','../video/reading_level3/negatelibu.mp4'],
			['のうぎょう','../video/reading_level3/nougyou.mp4'],
			['はいきんぐ','../video/reading_level3/haikinngu.mp4'],
			['ひえしょう','../video/reading_level3/hiesyou.mp4'],
			['ぷらすちっく','../video/reading_level3/purasutikku.mp4'],
			['べんきょう','../video/reading_level3/bennkyou.mp4'],
			['ほうこくしょ','../video/reading_level3/houkokusyo.mp4'],
			['まかろん','../video/reading_level3/makaron.mp4'],
			['みずたまり','../video/reading_level3/mizutamari.mp4'],
			['むーびー','../video/reading_level3/mu-bi-.mp4'],
			['めいきんぐ','../video/reading_level3/meikingu.mp4'],
			['もぎてん','../video/reading_level3/mogiten.mp4'],
			['やじるし','../video/reading_level3/yazirusi.mp4'],
			['ゆうえんち','../video/reading_level3/yuuenti.mp4'],
			['ようきゅう','../video/reading_level3/youkyuu.mp4'],
			['らっぱ','../video/reading_level3/rappa.mp4'],
			['りあくしょん','../video/reading_level3/riakusyon.mp4'],
			['るすばん','../video/reading_level3/rusuban.mp4'],
			['れんたかー','../video/reading_level3/rentaka-.mp4'],
			['わいふぁい','../video/reading_level3/waifai.mp4'],
			['ばらんす','../video/reading_level3/baransu.mp4'],
			['ぱぷりか','../video/reading_level3/papurika.mp4'],
			['ぴくにっく','../video/reading_level3/pikunikku.mp4'],
			['ぺっとぼとる','../video/reading_level3/pettobotoru.mp4']];
	exp = 3;
}

else location.href = 'index.html';  //URLがおかしい場合はメニューにとぶ

let status = true;  //処理が可能か判断する
let score = 0;  //正解数
let ram = Math.floor(Math.random() * Math.floor(vocab.length));  //乱数の生成
let cpText = vocab[ram][0];  //テキストはランダムで決める
//console.log(cpText);
$("#video").html('<video controls src="' + vocab[ram][1] + '" type="video/mp4" width="560" height="420"></video>');
function reply() {
	if(status) {
		let usrText = $("#textInput").val();  //ユーザーのテキスト
		$("#textInput").val("");  //入力フォームを空にする
		if(usrText == cpText) {
			score++;
			$("#progress").css({'width':(score*20)+'%'});
			ram = Math.floor(Math.random() * Math.floor(vocab.length));
			cpText = vocab[ram][0];  //テキストはランダムで決める
			//console.log(cpText);
			$("#video").html('<video controls src="' + vocab[ram][1] + '" type="video/mp4" width="560" height="420"></video>');
            if(score == 5) {
				status = false;  //ユーザーからの入力を終了する
				swal.fire({
					title: "ステージクリア！",
					text: "レベルが" + exp + "つあがりました！",
					icon: "success",
				}).then(function() {
					location.href = 'index.html';
				});
			}
		}
		else {
			swal.fire({
				title: "不正解！",
				icon: "error",
				timer: 1000,
				showConfirmButton: false,
			});
		}
	}
}

$("#textInput").keypress(function(e) {
    if ((e.which == 13) && document.getElementById("textInput").value != "" ) reply();
})

$("#buttonInput").click(function() {
    if (document.getElementById("textInput").value != "") reply();
})

$("#yubimoji").click(function() {
	$("#modal").fadeIn();  //モーダルを表示
})

$(".modal-close").click(function() {
	$("#modal").fadeOut();  //モーダルを非表示
})
