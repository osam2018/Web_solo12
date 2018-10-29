<template>
    <div class="sub-page movie-list">
      <list-viewer :items="reserveFilter" :per-page="8" title="예매 목록" template="reserve" :category="{ '영화 제목': 'movieTitle', '위치': 'cinemaName' }"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ListViewer from "../components/shared/ListViewer.vue";

    @Component({
      components: {ListViewer}
    })
    export default class ReserveList extends Vue {
      private currentUser:object = window.globalData.currentUser;
      private reserves:object = window.globalData.reserves;

      get reserveFilter() {
        if(this.currentUser.length) {
          return this.reserves.filter(v => {
            return v.user === this.currentUser[0].name
          });
        }

        return this.reserves.filter(v => {
          return !v.user;
        });
      }
    }
</script>

<style lang="scss">

</style>
