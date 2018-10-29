<template>
  <div class="card col-3">
    <div class="card-outer">
      <div class="card-inner">
        <h5>{{ reserve.movie.title }}</h5>
        <div class="card-caption">
          <small>위치 : {{ reserve.cinema.name }}</small>
          <small>일자 : {{ reserve.datetime.toLocaleString() }}</small>
        </div>
        <p>
          좌석 : <template v-for="i in reserve.seat">[{{i.row + 1}}:{{i.col + 1}}] </template>
        </p>
        <img src="../../../public/img/barcode.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ListTicketTemplate extends Vue {
      @Prop() private reserve:object;
    }
</script>

<style lang="scss" scoped>
  .card {
    border: none;
    margin-bottom: 2rem;
    border-radius: 3px;

    img {
      width: 100%;
    }

    &-outer {
      background: linear-gradient(45deg, #5f3abf, #d50ce8);
    }

    &-inner {
      background: white;
      width: 100%;
      margin-top: 5px;
      border: 1px solid #ddd;
      text-align: center;
    }

    h5 {
      margin: 20px 0;
      font-weight: bold;
      margin-bottom: 15px;
      background: linear-gradient(45deg, #5f3abf, #d50ce8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &-caption {
      background: linear-gradient(45deg, #5f3abf, #d50ce8);
      padding: 10px;
      margin-top: 25px;

      small {
        display: block;
        color: white;
      }
    }

    p {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }

    img {
      width: 80%;
      height: 40px;
    }
  }
</style>
