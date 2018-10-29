<template>
    <div class="sub-page movie-list">
      <list-viewer :items="movies" :per-page="8" title="영화 목록" template="movie" :category="{ '제목': 'title' }"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ListViewer from "../components/shared/ListViewer.vue";

    @Component({
      components: {ListViewer}
    })
    export default class MovieList extends Vue {
      private movies:object = window.globalData.movies;
    }
</script>

<style lang="scss">
  .movie-list {
  }
</style>
