<template>
    <div class="main-parallax" ref="parallax">
      <h4>오늘의 영화</h4>
      <h3>INTERSTELLER</h3>
      <blockquote>
        <i class="fa fa-quote-left"></i>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipisicing elit.
        <i class="fa fa-quote-right"></i>
      </blockquote>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class MainParallax extends Vue {
      mounted() {
        var parallax = this.$refs.parallax;

        (function frame() {
          var offset = (document.documentElement.scrollTop - parallax.offsetTop - (parallax.offsetHeight / 2)) / 1.5;

          parallax.style.backgroundPositionY = offset + 'px';

          requestAnimationFrame(frame);
        })();
      }
    }
</script>

<style lang="scss" scoped>
  .main-parallax {
    padding: 50px 0;
    height: 500px;
    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('../../../public/img/parallax.jpg') no-repeat 50% 450px;
    background-size: 1920px;
    color: white;
    text-align: center;

    h3 {
      margin: 80px 0;
      font-size: 60px;
      font-weight: normal;
      font-family: 'Gothic A1', sans-serif;
      letter-spacing: .3em;
    }

    blockquote {
      display: inline-block;
      position: relative;
      font-family: 'Nanum Myeongjo', serif;
      font-size: 22px;
      font-style: italic;
      letter-spacing: 1px;
      line-height: 1.5;

      .fa {
        position: absolute;
        font-size: 16px;

        &-quote-left {
          top: -10px;
          left: -40px;
        }

        &-quote-right {
          bottom: -10px;
          right: -40px;
        }
      }
    }
  }
</style>
