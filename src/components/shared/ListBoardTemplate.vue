<template>
  <div class="col-12 article" @click="$globalBus.$emit('articleViewOpen', item)">
    <h6><small>[{{ item.category }}]</small> {{ item.title }}</h6>
    <div class="article-right">
      <span>작성자: {{ item.writer }}</span>
      <span>작성일: {{ item.date }}</span>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ListTicketTemplate extends Vue {
      @Prop() private item:object;
    }
</script>

<style lang="scss" scoped>
  .article {
    padding: 17px 15px 15px;
    border: 1px solid #ddd;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 0;
    }

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      margin-bottom: 30px;
      border-radius: 0 0 5px 5px;
    }

    small {
      font-weight: bold;
      color: #007bff;
      margin-right: 5px;
    }

    h6 {
      float: left;
    }

    &-right {
      float: right;
      font-size: 14px;

      span {
        padding-left: 10px;
        color: #999;

        &:first-child:after {
          content: '|';
          margin-left: 10px;
          color: rgba(0,0,0,.3);
        }
      }
    }
  }
</style>
