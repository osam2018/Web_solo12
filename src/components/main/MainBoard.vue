<template>
  <b-container class="main-board">
    <b-row>
      <b-col class="main-board-wrap" v-for="board in boards">
        <h4>{{ board.name }}</h4>
        <b-tabs class="main-board-tabs">
          <b-tab title="전체" active>
            <b-list-group>
              <b-list-group-item v-for="article in getBoardArticle(board.name)">
                <h5>
                  <a href="#" @click.prevent="$globalBus.$emit('articleViewOpen', article)">
                    <strong>[{{ article.category }}]</strong>
                    {{ article.title }}
                  </a>
                </h5>
                <small>{{ article.date }}</small>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
          <b-tab :title="category" v-for="category in board.category">
            <b-list-group>
              <b-list-group-item v-for="article in getArticle(board.name, category)">
                <h5>
                  <a href="#" @click.prevent="$globalBus.$emit('articleViewOpen', article)">
                    <strong>[{{ article.category }}]</strong>
                    {{ article.title }}
                  </a>
                </h5>
                <small>{{ article.date }}</small>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class MainBoards extends Vue {
      private boards:object = window.globalData.boards;
      private articles:object = window.globalData.articles;

      private getArticle(board, category, len=5) {
        return this.articlesProc(this.articles.filter(v => {
          return v.board === board && v.category === category;
        }));
      }

      private getBoardArticle(board, len=5) {
        return this.articlesProc(this.articles.filter(v => {
          return v.board === board;
        }));
      }

      private articlesProc(articles, len=5) {
        return articles.sort().slice(0, len);
      }
    }
</script>

<style lang="scss" scoped>
  .main-board {
    border-top: 1px solid #f2f2f2;
    padding: 50px 30px;

    h5 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    h4 {
      padding: 0;
    }

    small {
      color: #555;
    }

    .list-group-item {
      margin-top: 10px;

      a {
        color: inherit;
        text-decoration: none;

        strong {
          color: #007bff;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
</style>
