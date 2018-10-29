<template>
  <div class="card col-3">
    <div class="card-inner">
      <img :src="cinema.image" alt="">
      <div class="card-caption">
        <h5>{{ cinema.name }}</h5>
        <b-button class="w-100 ml-0" variant="primary" @click="$globalBus.$emit('cinemaSelect', cinema)">선택하기</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ListCinemaTemplate extends Vue {
      @Prop() private cinema:object;
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
