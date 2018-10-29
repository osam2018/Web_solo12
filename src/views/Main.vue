<template>
  <div class="main">
    <main-banner id="main_banner"/>
    <main-carousel id="main_carousel"/>
    <main-board id="main_board"/>
    <main-parallax id="main_parallax"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainBanner from "../components/main/MainBanner.vue";
import MainCarousel from "../components/main/MainCarousel.vue";
import MainBoard from "../components/main/MainBoard.vue";
import MainParallax from "../components/main/MainParallax.vue";

@Component({
    components: {MainParallax, MainBoard, MainCarousel, MainBanner}
})
export default class Main extends Vue {}
</script>

<style lang="scss">
  html, body {
    font-family: 'Nanum Gothic', sans-serif;
  }

  .main {
    h4 {
      margin-bottom: 20px;
      padding: 0 10px;
    }
  }
</style>
