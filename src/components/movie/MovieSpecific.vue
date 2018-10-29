<template>
  <div class="movie-spec">
    <b-modal id="modal_movie_spec" ref="modalMovieSpec" title="영화 상세보기" hide-footer centered>
      <template v-if="movie">
        <div class="movie-spec-bg"></div>
        <div class="movie-spec-content row">
          <div class="movie-spec-left col-4">
            <img :src="movie.image" alt="">
            <p class="movie-spec-info">
              <b>개봉일</b>
              {{ movie.date }}
              <b>감독</b>
              {{ movie.director }}
              <b>배우</b>
              {{ movie.actor }}
            </p>
          </div>
          <div class="movie-spec-right col-8">
            <h5 class="movie-spec-title">{{ movie.title }}</h5>
            <p class="movie-spec-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div>
              <h6>줄거리</h6>
              <pre>{{ movie.desc }}</pre>
              <h6>주요 장면</h6>
              <b-carousel controls indicators :interval="4000" img-width="1024" img-height="480">
                <b-carousel-slide img-src="./img/example-1.jpg"></b-carousel-slide>
                <b-carousel-slide img-src="./img/example-2.jpg"></b-carousel-slide>
                <b-carousel-slide img-src="./img/example-3.jpg"></b-carousel-slide>
                <b-carousel-slide img-src="./img/example-4.jpg"></b-carousel-slide>
              </b-carousel>
              <h6>큐레이터 리뷰</h6>
              <b-row>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-1.jpg" width="64" height="64" alt="" />
                  <h5 class="mt-1">그저 놀랍다.</h5>
                  <p>이렇게 아름다울 수가!</p>
                </b-media>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-2.jpg" width="64" height="64" alt="" />
                  <h5 class="mt-1">이럴수가</h5>
                  <p>정말 놀랍군요!</p>
                </b-media>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-3.gif" width="64" height="64" alt="" />
                  <h5 class="mt-1">별로네요...</h5>
                  <p>저런 저런 돈이 아깝다</p>
                </b-media>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-3.gif" width="64" height="64" alt="" />
                  <h5 class="mt-1">이것은 타이틀</h5>
                  <p>엥 이런 영화도 있었냐</p>
                </b-media>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-3.gif" width="64" height="64" alt="" />
                  <h5 class="mt-1">저주를 받았다</h5>
                  <p>이 글을 복사해야 풀린다</p>
                </b-media>
                <b-media class="col-6">
                  <b-img slot="aside" src="./img/person-3.gif" width="64" height="64" alt="" />
                  <h5 class="mt-1">내 위에 리뷰</h5>
                  <p>안녕하십니까?</p>
                </b-media>
              </b-row>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MovieSpecific extends Vue {
    private movie:object = null;

    mounted() {
      this.$globalBus.$on('movieSpecificOpen', e => {
        this.movie = e;
        this.$refs.modalMovieSpec.show();
      });
    }
  }
</script>

<style lang="scss">
  .movie-spec {
    &-bg {
      background: linear-gradient(45deg, #5f3abf, #d50ce8);
      height: 250px;
    }

    &-content {
      margin-top: -100px;
      padding: 0 150px 70px;
    }

    &-left {
      img {
        width: 100%;
      }
    }

    &-right {
      h6 {
        margin-top: 50px;
        font-weight: bold;
        font-size: 18px;
      }

      .media {
        margin-top: 10px;
        font-size: 14px;

        h5 {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }

    &-title {
      padding-top: 15px;
      font-size: 30px;
      font-weight: bold;
      color: white;
    }

    &-sub {
      color: rgba(255,255,255,.5);
    }

    &-info {
      font-size: 14px;
      margin-top: 20px;
      text-align: center;
      color: #666;

      b {
        font-size: 18px;
        color: #333;
        display: block;
        margin: 20px 0 5px;
      }
    }
  }

  #modal_movie_spec {
  }
</style>

<style lang="scss">
  #modal_movie_spec .modal-dialog {
    width: 1100px !important;
    max-width: 1100px !important;
  }

  #modal_movie_spec .modal-body {
    padding: 0;
  }
</style>
