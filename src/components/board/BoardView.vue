<template>
  <div class="board-view">
    <b-modal id="modal_board_view" ref="modalBoardView" size="lg" title="게시글 보기" hide-footer centered>
      <template v-if="article">
        <h4>{{ article.title }}</h4>
        <span class="board-view-info">
          <span>작성자 : {{ article.writer }}</span>
          <span>작성일 : {{ article.date }}</span>
        </span>
        <p>{{ article.content }}</p>
        <b-button-group class="board-view-btn" v-if="currentUser.length && article.writer === currentUser[0].name">
          <b-button variant="secondary" @click="$globalBus.$emit('articleWriteOpen', article)">수정</b-button>
          <b-button variant="danger" @click="$globalBus.$emit('articleDeleteOpen', article)">삭제</b-button>
        </b-button-group>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class BoardView extends Vue {
    private currentUser:object = window.globalData.currentUser;
    private article:object = null;

    mounted() {
      this.$globalBus.$on('articleViewOpen', e => {
        this.article = e;

        try {
          this.$refs.modalBoardView.show();
        } catch(e) {}
      });
    }
  }
</script>

<style lang="scss">
  #modal_board_view {
    text-align: center;

    h4 {
      margin: 20px 0 0;
    }
    .board-view-info {
      display: block;
      margin: 10px 0 20px;
      padding-bottom: 30px;
      position: relative;
      text-align: center;
      font-size: 14px;
      color: #999;

      span:first-child {
        &:after {
          content: '|';
          margin: 0 10px;
          opacity: .3;
        }
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 30px;
        height: 2px;
        background: rgba(0,0,0,.5);
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
    p {
        text-align: left;
        padding: 20px;
    }
  }

  #modal_movie_spec .modal-dialog {
    width: 1100px !important;
    max-width: 1100px !important;
  }

  #modal_movie_spec .modal-body {
    padding: 0;
  }
</style>
