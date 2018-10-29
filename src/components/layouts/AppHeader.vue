<template>
  <div class="header">
    <transition name="fade">
    <b-navbar toggleable="md" class="nav-main" v-if="!$route.path.includes('/reserve')">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand><router-link to="/">Movie App</router-link></b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/movie">영화 목록</router-link></b-nav-item>
            <b-nav-item-dropdown text="영화 예매" right>
              <b-dropdown-item><router-link to="/reserve">예매하기</router-link></b-dropdown-item>
              <b-dropdown-item><router-link to="/ticket">예매목록</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="영화 소식" right>
                <b-dropdown-item><router-link to="/board/adverts">공지사항</router-link></b-dropdown-item>
                <b-dropdown-item><router-link to="/board/movies">영화 소식</router-link></b-dropdown-item>
                <b-dropdown-item><router-link to="/board/actors">배우 소식</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item :class="{ 'd-none': currentUser.length }" v-b-modal.modal_login>로그인</b-nav-item>
            <b-nav-item :class="{ 'd-none': currentUser.length }" v-b-modal.modal_register>회원가입</b-nav-item>
            <b-nav-item :class="{ 'd-none': !currentUser.length }" v-b-modal.modal_logout>로그아웃</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    </transition>
    <transition name="fade">
      <b-navbar toggleable="md" class="nav-sub" v-b-scrollspy="150" v-if="$route.path === '/'">
        <b-container>
          <b-navbar-nav class="m-auto">
              <b-nav-item href="#main_banner" @click="scrollIntoView">최신 영화</b-nav-item>
              <b-nav-item href="#main_carousel" @click="scrollIntoView">인기 영화</b-nav-item>
              <b-nav-item href="#main_board" @click="scrollIntoView">최근 소식</b-nav-item>
              <b-nav-item href="#main_parallax" @click="scrollIntoView">오늘의 영화</b-nav-item>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
    </transition>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class AppHeader extends Vue {
      private currentUser:object = window.globalData.currentUser;

      private scrollIntoView (evt) {
        evt.preventDefault();
        const href = evt.target.getAttribute('href');
        const el = href ? document.querySelector(href) : null;
        if (el) {
          anime.remove("html, body");
          anime({
            targets: "html, body",
            scrollTop: el.offsetTop - 150,
            easing: 'easeInOutQuint',
            duration: 500
          });
        }
      }
    }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 100;

    .nav {
      &-sub {
        background-color: #f2f2f2;

        .nav-item.active {
          position: relative;
          top: 2px;
          border-bottom: 3px solid #007bff;
        }
      }
      &-main {
        .nav-item {
          border-right: 1px solid #CCC;

          &:first-child {
            border-left: 1px solid #CCC;
          }
        }
      }
      &bar {
        border-bottom: 1px solid #ddd;
        padding: 0;
      }
      &-item {
        display: flex;
        padding: 0 8px;
        align-items: center;
        height: 50px;
        font-size: 14px;
      }
    }

    a {
      color: inherit;
      text-decoration: none !important;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
