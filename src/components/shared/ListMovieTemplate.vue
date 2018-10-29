<template>
  <div class="card col-3">
    <div class="card-inner">
      <img :src="movie.image" alt="">
      <div class="card-caption">
        <h5>{{ movie.title }}</h5>
        <b-button variant="light" @click="$globalBus.$emit('movieSpecificOpen', movie)">상세보기</b-button>
        <b-button variant="primary" @click="$router.push('/reserve/' + movie.title)">예매하기</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ListMovieTemplate extends Vue {
      @Prop() private movie:object;
    }
</script>

<style lang="scss" scoped>
  .card {
    border: none;
    margin-bottom: 2rem;

    img {
      width: 100%;
    }

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
</style>
