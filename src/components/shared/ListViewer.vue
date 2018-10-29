<template>
  <b-container>
    <b-row class="list-search">
      <h4>{{ title }}</h4>
      <b-form class="ml-auto" inline>
        <b-form-select v-model="searchCategory" class="mr-2">
          <option :value="null">검색 항목</option>
          <option v-for="(v, k) in category" :value="v">{{ k }}</option>
        </b-form-select>
        <b-input v-model="searchInput" placeholder="검색어"></b-input>
      </b-form>
    </b-row>
    <b-row class="list-list">
      <template v-for="(item, index) in searchItem" v-if="(Math.floor(index / perPage) + 1) === currentPage">
        <list-movie-template v-if="template === 'movie'" :movie="item" />
        <list-reserve-template v-if="template === 'movieReserve'" :movie="item" />
        <list-cinema-template v-if="template === 'cinemaReserve'" :cinema="item" />
        <list-ticket-template v-if="template === 'reserve'" :reserve="item"/>
        <list-board-template v-if="template === 'board'" :item="item"/>
      </template>
    </b-row>
    <div class="list-empty" v-if="!searchItem.length">
    찾으시는 데이터가 없습니다!
    </div>
    <template v-if="template === 'board' && currentUser.length">
      <b-row>
        <b-pagination size="md" v-model="currentPage" :total-rows="searchItem.length" :per-page="perPage" class="mb-0 mr-auto"></b-pagination>
        <b-button variant="primary" v-b-modal.modal_board_write>글 작성</b-button>
      </b-row>
    </template>
    <template v-else>
      <b-pagination align="center" size="md" v-model="currentPage" :total-rows="searchItem.length" :per-page="perPage"></b-pagination>
    </template>
  </b-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ListMovieTemplate from "./ListMovieTemplate.vue";
    import ListReserveTemplate from "./ListReserveTemplate.vue";
    import ListCinemaTemplate from "./ListCinemaTemplate.vue";
    import ListTicketTemplate from "./ListTicketTemplate.vue";
    import ListBoardTemplate from "./ListBoardTemplate.vue";

    @Component({
      components: {ListBoardTemplate, ListTicketTemplate, ListCinemaTemplate, ListReserveTemplate, ListMovieTemplate}
    })
    export default class ListViewer extends Vue {
      @Prop() private items:object;
      @Prop() private title:object;
      @Prop() private perPage:object;
      @Prop() private template:object;
      @Prop() private category:object;

      private currentUser:object = window.globalData.currentUser;

      private currentPage:number = 1;
      private searchCategory:string = null;
      private searchInput:string = "";

      get searchItem() {
        return this.items.filter(v => {
          if(!this.searchInput
          || !this.searchCategory)
            return true;

          return v[this.searchCategory].includes(this.searchInput);
        });
      }
    }
</script>

<style lang="scss" scoped>
  .list-search {
    margin-bottom: 30px;
    padding: 0 12px;
  }

  .list-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    height: 300px;
    color: #999;
  }
</style>
