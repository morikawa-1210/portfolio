$(function(){
    var pagetop = $('#page-top');
    pagetop.hide();
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
       }
    });
    pagetop.click(function () {
       $('body, html').animate({ scrollTop: 0 }, 500);
       return false;
    });
  });

  $(function () {
   var webStorage = function () {
     if (sessionStorage.getItem('access')) {
       /*
         2回目以降アクセス時の処理
       */
       $(".loading").addClass('is-active');
     } else {
       /*
         初回アクセス時の処理
       */
       sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
       $(".loading-animation").addClass('is-active'); // loadingアニメーションを表示
       setTimeout(function () {
         // ローディングを数秒後に非表示にする
         $(".loading").addClass('is-active');
         $(".loading-animation").removeClass('is-active');
       }, 3000); // ローディングを表示する時間
     }
   }
   webStorage();
 });

 

window.addEventListener('load', function () {
	const ranking = document.querySelectorAll('.ranking');

	ranking.forEach((rankingWrapper, index) => {
		const ranking = rankingWrapper.querySelector('ul');      // ul要素
		const items = Array.from(ranking.children);              // 子要素
		const speedSeconds = 40;                                 // スクロール1回にかかる秒数
		const direction = (index % 2 === 0) ? 'left' : 'right'; // 奇数番目は左、偶数は右

		// 無限スクロール用に複製
		items.forEach(item => ranking.appendChild(item.cloneNode(true)));

		const rankingWidth = ranking.scrollWidth / 2;
		let pos = direction === 'left' ? 0 : -rankingWidth;
		const pixelsPerFrame = rankingWidth / (speedSeconds * 60);

		function animate() {
			pos += direction === 'left' ? -pixelsPerFrame : pixelsPerFrame;

			// 無限ループ
			if (pos <= -rankingWidth) pos += rankingWidth;
			if (pos >= 0) pos -= rankingWidth;

			ranking.style.transform = `translateX(${pos}px)`;
			requestAnimationFrame(animate);
		}

		animate();
	});
});


