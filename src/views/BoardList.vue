<template>
    <div class="sub-page board-list">
      <list-viewer :items="items" :per-page="8" :title="boardTitle" template="board" :category="{ '제목': 'title', '카테고리': 'category', '작성자': 'writer' }"/>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ListViewer from "../components/shared/ListViewer.vue";

    @Component({
      components: {ListViewer}
    })
    export default class MovieList extends Vue {
      private boards:object = window.globalData.boards;
      private articles:object = window.globalData.articles;
      private boardTitle:text = '소식 목록';

      get items() {
        var id = this.$route.params.id,
            board = this.boards.filter(v => {
              return v.id === id;
            });

        if(!board.length)
          return [];

        this.boardTitle = board[0].name;

        return this.articles.filter(v => {
          return v.board === board[0].name;
        });
      }
    }
</script>

<style lang="scss" scoped>

</style>
