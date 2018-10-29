<template>
<div class="banner main-banner" ref="container">
  <canvas class="banner-canvas" ref="canvas" width="1920" height="600"></canvas>
  <div class="banner-prev fa fa-angle-left"></div>
  <div class="banner-next fa fa-angle-right"></div>
  <div class="banner-slide">
    <img class="banner-image" src="@/assets/img/banner-1.jpg"></img>
    <div class="banner-title">블랙 펜서</div>
    <div class="banner-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
  <div class="banner-slide">
    <img class="banner-image" src="@/assets/img/banner-2.jpg"></img>
    <div class="banner-title">데드풀</div>
    <div class="banner-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
  <div class="banner-slide">
    <img class="banner-image" src="@/assets/img/banner-3.jpg"></img>
    <div class="banner-title">리오</div>
    <div class="banner-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
  <div class="banner-slide">
    <img class="banner-image" src="@/assets/img/banner-4.jpg"></img>
    <div class="banner-title">맨 오브 스틸</div>
    <div class="banner-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
</div>
</template>

<script>
    export default  {
      mounted() {
        var container = this.$refs.container,
          images = [].slice.call(container.querySelectorAll('.banner-image')),
          titles = [].slice.call(container.querySelectorAll('.banner-title')),
          sub = [].slice.call(container.querySelectorAll('.banner-sub')),
          btnPrev = container.querySelector('.banner-prev'),
          btnNext = container.querySelector('.banner-next');

        var canvas = this.$refs.canvas,
          context = canvas.getContext('2d');

        var slidesLength = images.length,
          curIdx = 0, curImgIdx, curTitleIdx, curSubIdx,
          titleIdx = [],
          subIdx = [];

        var windowWidth = window.innerWidth,
          slider;

        var resizeTimer,
          hideTimer,
          initial = true;

        function updateIdx() {
          curImgIdx = curIdx * 3;
          curTitleIdx = curImgIdx + 1;
          curSubIdx = curImgIdx + 2;
        }
        updateIdx();

        var imgOpt = {
          angle: 45,
          extraSpacing: { extraX: 600, extraY: 600 },
          piecesWidth: _ => Pieces.random(100, 200),
          ty: _ => Pieces.random(-400, 400)
        };

        var titleOpt = {
          color: 'white',
          backgroundColor: '#5104ab',
          fontSize: _ => windowWidth > 720 ? 50 : 30,
          padding: '15 20 10 20',
          angle: -45,
          piecesSpacing: 2,
          extraSpacing: { extraX: 0, extraY: 300 },
          piecesWidth: _ => Pieces.random(10, 100),
          ty: _ => Pieces.random(-200, 200),
          translate: { translateX: 0, translateY: 0 }
        };

        var subOpt = {
          color: 'white',
          backgroundColor: '#4f048e',
          fontSize: _ => windowWidth > 720 ? 18 : 10,
          padding: _ => windowWidth > 720 ? '18 35 10 38' : '18 25 10 28',
          angle: 45,
          piecesWidth: 2,
          extraSpacing: { extraX: 1000, extraY: 1000 },
          piecesWidth: 100,
          ty: _ => Pieces.random(-200, 200),
          translate: _ => {
            if(windowWidth > 575) return { translateX: 0, translateY: 70 };
            return { translateX: 0, translateY: 50 };
          }
        }

        var items = [];
        var imgReady = 0;

        for(var i = 0; i < slidesLength; i++) {
          var slideImg = new Image();
          slideImg.onload = _ => {
            if(++imgReady == slidesLength) {
              initSlider();
              initEvents();
            }
          }

          items.push({ type: 'image', value: images[i], options: imgOpt });
          items.push({ type: 'text', value: titles[i].innerText, options: titleOpt });
          items.push({ type: 'text', value: sub[i].innerText, options: subOpt });

          titleIdx.push(i * 3 + 1);
          subIdx.push(i * 3 + 2);

          slideImg.src = images[i].src;
        }

        function initSlider() {
          if(slider) {
            slider.stop();
          }

          slider = new Pieces({
            canvas: canvas,
            items: items,
            x: 'centerAll',
            y: 'centerAll',
            piecesSpacing: 1,
            fontFamily: ["'Gothic A1', sans-serif"],
            animation: {
              duration: _ => {
                return Pieces.random(1000, 2000)
              },
              easing: 'easeOutQuint'
            }
          });

          slider.animateItems({
            items: titleIdx,
            duration: 20000,
            angle: 360,
            loop: true
          });

          showItems();
        }

        function initEvents() {
          btnPrev.addEventListener('click', prevItem, false);
          btnNext.addEventListener('click', nextItem, false);
          window.addEventListener('resize', resizeStart, false);
        }

        function showItems() {
          slider.showPieces({
            items: curImgIdx,
            ignore: ['tx'],
            singly: true,
            update: anim => {
              if(anim.progress > 60) {
                var piece = anim.animatables[0].target,
                  ty = piece.ty;

                anime.remove(piece);

                anime({
                  targets: piece,
                  ty: piece.h_ty < 300 ?
                    [{ value: ty + 10, duration: 1000 }, {value: ty - 10, duration: 2000}] :
                    [{ value: ty - 10, duration: 1000 }, {value: ty + 10, duration: 2000}],
                  duration: 2000,
                  easing: 'linear',
                  loop: true
                });
              }
            }
          });

          slider.showPieces({ items: curTitleIdx });
          slider.showPieces({ items: curSubIdx });
        }

        function hideItems() {
          slider.hidePieces({ items: [curImgIdx, curTitleIdx, curSubIdx] });
        }

        function prevItem() {
          hideItems();
          curIdx = curIdx > 0 ? curIdx - 1 : slidesLength - 1;
          updateIdx();
          showItems();
        }

        function nextItem() {
          hideItems();
          curIdx = curIdx < slidesLength - 1 ? curIdx + 1 : 0;
          updateIdx();
          showItems();
        }

        function resizeStart() {
          if(initial) {
            initial = false;
            if(hideTimer) clearTimeout(hideTimer);
            canvas.classList.add('banner-canvas-hidden');
          }
          if(resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resizeEnd, 300);
        }

        function resizeEnd() {
          initial = true;
          windowWidth = window.innerWidth;
          initSlider();
          hideTimer = setTimeout(function() {
            canvas.classList.remove('banner-canvas-hidden');
          }, 500);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .banner {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: linear-gradient(45deg, #5f3abf, #d50ce8);

    &-canvas {
      width: 100%;
      height: 100%;
      transition: opacity .2s ease;

      &-hidden {
        opacity: 0;
      }
    }

    &-slide {
      position: absolute;
      right: 100%;
      top: -100%;
    }

    &-image {
      width: 100vw;
    }

    &-prev,
    &-next {
      z-index: 30;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 70px;
      height: 100%;
      color: white;
      font-size: 24px;
      cursor: pointer;
      background: linear-gradient(90deg, rgba(0,0,0,.3), rgba(0,0,0,0));
    }

    &-next {
      left: auto;
      right: 0;
      background: linear-gradient(-90deg, rgba(0,0,0,.3), rgba(0,0,0,0));
    }
  }
</style>
