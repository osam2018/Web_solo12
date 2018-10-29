<template>
  <div class="board-view">
    <b-modal ref="modalBoardDelete" size="sm" hide-header centered>
      <p class="message-complete">
        글 삭제가 완료되었습니다.
      </p>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" variant="primary" @click="hideCompleteModal">
          Close
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class BoardView extends Vue {
    private articles:object = window.globalData.articles;

    private hideCompleteModal() {
      try {
        this.$refs.modalBoardDelete.hide();
      } catch(e) {}
    }

    mounted() {
      this.$globalBus.$on('articleDeleteOpen', e => {
        for(var i in this.articles) {
          if(this.articles[i] === e) {
            this.articles.splice(i, 1);
          }
        }

        try {
          this.$refs.modalBoardDelete.show();
        } catch(e) {}
      });
    }
  }
</script>

<style lang="scss" scoped>
</style>
