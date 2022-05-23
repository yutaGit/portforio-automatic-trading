// スムーススクロール------------------------------------------------
const jsSmoothScroll = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < jsSmoothScroll.length; i++){
    jsSmoothScroll[i].addEventListener('click', (e) => {
        e.preventDefault();
        let href = jsSmoothScroll[i].getAttribute('href');
        let target = document.getElementById(href.replace('#', ''));
        const rect = target.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        const position = rect + offset;

        window.scrollTo({
            top: position,
            behavior: 'smooth',
        });
    });
}

// フワッと表示------------------------------------------------------
function scroll_effect() {
    var element = document.getElementsByClassName('scroll-up');
    if(!element) return;
    var scrollY = window.pageYOffset;
    var windowH = window.innerHeight;
    var showTiming = 200; // 要素を表示するタイミング
        for(var i = 0; i < element.length; i++) {
            var elemClientRect = element[i].getBoundingClientRect();
            var elemY = scrollY + elemClientRect.top;
            if(scrollY > elemY - windowH + showTiming) {
            element[i].classList.add('is-show');
        }
    }
}
  window.addEventListener('scroll', scroll_effect); // スクロール時に実行

//水玉-------------------------------------------------------------
window.onload = function() {
    Particles.init({
        selector: '.background',
        sizeVariations: 40,
        color: [
        'rgba(255,255,255,.6)', 'rgba(187,155,100,.8)', 'rgba(10,10,10,.2)'
        ]
    });
};


//波---------------------------------------------------------------
(function () {
    var unit = 100,
        canvas,
        context,
        canvas2,
        context2,
        height,
        width,
        xAxis,
        yAxis,
        draw;

    function init() {
        canvas = document.getElementById("sineCanvas");
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 500;
        context = canvas.getContext("2d");
        height = canvas.height;
        width = canvas.width;
        xAxis = Math.floor(height / 2); //高さ
        yAxis = 0;
        draw();
    }

    function draw() {
        // キャンバスの描画をクリア
        context.clearRect(0, 0, width, height);
        //波を描画
        drawWave("#2b2b2b", 1, 3,0);
        draw.seconds = draw.seconds + 0.009;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 35);
    }
    draw.seconds = 0;
    draw.t = 0;

    //波を描画
    function drawWave(color, alpha, zoom, delay) {
        context.fillStyle = color;
        context.globalAlpha = alpha;
        context.beginPath(); //パスの開始
        drawSine(draw.t / 0.5, zoom, delay);
        context.lineTo(width + 10, height); //パスをCanvasの右下へ
        context.lineTo(0, height); //パスをCanvasの左下へ
        context.closePath(); //パスを閉じる
        context.fill(); //塗りつぶす
    }

    //drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
    function drawSine(t, zoom, delay) {
        var x = t; //時間を横の位置とする
        var y = Math.sin(x) / zoom;
        context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く
        //横幅の分、波を描画
        for (i = yAxis; i <= width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
        }
    }
    init();
})();