<template>
  <div class="board-view">
    <b-modal id="modal_board_write" ref="modalBoardWrite" title="게시글 쓰기" @hidden="onHidden" hide-footer centered>
      <b-form @submit.prevent="onSubmit">
        <template v-if="!article">
        <b-form-group label="게시판 (Borad)" label-for="board_write_board">
          <b-select id="board_write_board" v-model="form.board"  required>
            <option v-for="b in boards" :value="b">{{ b.name }}</option>
          </b-select>
        </b-form-group>
        <b-form-group label="카테고리 (Category)" label-for="board_write_category">
          <b-select id="board_write_category" v-model="form.category" required>
            <option v-if="form.board" v-for="c in form.board.category" v-model="form.category" :value="c">{{ c }}</option>
          </b-select>
        </b-form-group>
        </template>
        <b-form-group label="글 제목 (Title)" label-for="board_write_title">
          <b-input id="board_write_title" type="text" placeholder="글 제목 (Title)" v-model="form.title" required></b-input>
        </b-form-group>
        <b-form-group label="글 내용 (Contents)" label-for="board_write_content">
          <b-textarea id="board_write_content" :rows="10" placeholder="글 내용 (Contents)" v-model="form.content" required></b-textarea>
        </b-form-group>
        <b-btn type="submit" class="w-100" variant="primary">
          <template v-if="article">글 수정</template>
          <template v-else>글 작성</template>
        </b-btn>
      </b-form>
    </b-modal>
    <b-modal ref="modalBoardWriteComplete" size="sm" hide-header centered>
      <p class="message-complete">
        글 작성/수정이 완료되었습니다.
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
  export default class BoardWrite extends Vue {
    private currentUser:object = window.globalData.currentUser;
    private articles:object = window.globalData.articles;
    private boards:object = window.globalData.boards;

    private article:object = null;
    private form:object = {
      board: '',
      category: '',
      title: '',
      content: '',
      writer: ''
    };

    private onHidden() {
      this.article = null;
      this.form.title = '';
      this.form.content = '';
      this.form.writer = '';
    }

    private hideCompleteModal() {
      try {
        this.$refs.modalBoardWriteComplete.hide();
      } catch(e) {}
    }

    mounted() {
      this.$globalBus.$on('articleWriteOpen', e => {
        this.article = e;
        this.form.title = this.article.title;
        this.form.content = this.article.content;

        try {
          this.$refs.modalBoardWrite.show();
        } catch(e) {}
      });
    }

    private onSubmit() {
      var date = new Date();

      if(this.article) {
        this.article.title = this.form.title;
        this.article.content = this.form.content;
      } else {
        this.articles.unshift({
          board: this.form.board.name,
          category: this.form.category,
          title: this.form.title,
          content: this.form.content,
          writer: this.currentUser[0].name,
          date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        });
      }

      try {
        this.$refs.modalBoardWrite.hide();
        this.$refs.modalBoardWriteComplete.show();
      } catch(e) {}
    }
  }
</script>

<style lang="scss" scoped>

</style>
