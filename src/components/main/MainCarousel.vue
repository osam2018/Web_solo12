<template>
  <b-container class="main-caro">
    <h4>인기 영화</h4>
    <b-carousel @sliding-start="onSlideStart" @sliding-end="onSlideEnd" controls>
      <b-carousel-slide v-for="(movie, index) in movies">
        <div slot="img" class="card col-3" v-for="i in movies.length">
          <div class="card-inner">
            <img :src="getMovie(index, i).image" alt="">
            <div class="card-caption">
              <h5>{{ getMovie(index, i).title }}</h5>
              <b-button variant="light" @click="$globalBus.$emit('movieSpecificOpen', getMovie(index, i))">상세보기</b-button>
              <b-button variant="primary" @click="$router.push('/reserve/' + getMovie(index, i).title)">예매하기</b-button>
            </div>
          </div>
        </div>
      </b-carousel-slide>
    </b-carousel>
    <div class="carousel-fix" v-if="sliding"></div>
  </b-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class MainCarousel extends Vue {
      private movies:object[] = window.globalData.movies.slice(0, 7);
      private sliding = false;

      private getMovie(index, i) {
        return this.movies[(index + i - 1) % this.movies.length];
      }

      private onSlideStart() {
        this.sliding = true;
      }

      private onSlideEnd() {
        this.sliding = false;
      }
    }
</script>

<style lang="scss">
  .main-caro {
    margin: 50px 0;
    position: relative;

    .carousel-fix {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 50px;
    }

    .carousel-control {
      &-prev,
      &-next {
        opacity: 1 !important;
        width: 30px !important;
        top: -40px !important;
        left: auto !important;
        right: 8px !important;
        bottom: auto !important;

        &-icon {
          background: none !important;

          &:after {
            height: 30px !important;
            content: '\f105';
            font-family: 'Font Awesome 5 Free' !important;
            font-weight: 900;
            font-size: 22px;
            color: black;
          }
        }
      }

      &-prev {
        right: 40px !important;
      }

      &-prev-icon:after {
        content: '\f104';
      }
    }
    .carousel-item {
      &.active,
      &-next,
      &-prev {
        display: flex !important;
      }

      &-right.active, &-next { transform: translateX(25%) !important; }
      &-left.active, &-prev { transform: translateX(-25%) !important; }
      &-right, &-left { transform: translateX(0) !important; }

      img {
        width: 100%;
      }

      .card {
        border: none;

        &-inner {
          border: 1px solid #CCC;
          border-radius: 3px;
        }

        &-caption {
          padding: 20px;

          h5 {
            font-weight: bold;
            margin-bottom: 15px;
          }

          .btn {
            font-size: 14px;
            width: 48%;

            &:last-child {
              margin-left: 4%;
            }
          }
        }
      }
    }
    .carousel-caption {
      display: none;
    }
  }

  pre {
    font-family: 'Nanum Gothic', sans-serif !important;
    white-space: pre-wrap;
  }
</style>
