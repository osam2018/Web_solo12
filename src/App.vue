<template>
  <div id="wrap" :class="{ 'no-subnav': $route.path !== '/', 'no-basic': $route.path.includes('/reserve') }">
    <app-header/>
    <transition>
      <router-view/>
    </transition>
    <app-footer/>
    <app-login/>
    <app-logout/>
    <app-register/>
    <movie-specific/>
    <board-view/>
    <board-write/>
    <board-delete/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppHeader from "./components/layouts/AppHeader.vue";
  import AppFooter from "./components/layouts/AppFooter.vue";
  import AppLogin from "./components/layouts/AppLogin.vue";
  import AppLogout from "./components/layouts/AppLogout.vue";
  import AppRegister from "./components/layouts/AppRegister.vue";
  import MovieSpecific from "./components/movie/MovieSpecific.vue";
  import BoardView from "./components/board/BoardView.vue";
  import BoardWrite from "./components/board/BoardWrite.vue";
  import BoardDelete from "./components/board/BoardDelete.vue";

  @Component({
    components: {
      BoardDelete,
      BoardWrite, BoardView, MovieSpecific, AppLogout, AppRegister, AppLogin, AppHeader, AppFooter}
  })
  export default class Reserve extends Vue {}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    outline: none;
  }

  html, body {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 16px;
    letter-spacing: -.03rem;
  }

  #wrap {
    padding-top: 100px;
    transition: padding-top .3s ease;

    &.no-subnav {
      padding-top: 51px;
    }

    &.no-basic {
      padding-top: 0;
    }
  }

  .no-subnav {
    .nav-sub {
    }
  }

  .no-basic {
    .header,
    .footer {
      display: none;
    }
  }

  #modal_login,
  #modal_register{
    form {
      padding: 20px;
    }

    p {
      margin: 1rem 0 0;
      font-size: 14px;

      a {
        cursor: pointer;
      }
    }
  }

  #modal_login .modal-dialog,
  #modal_register .modal-dialog {
    width: 400px !important;
  }

  .auth-complete,
  .message-complete {
    padding-top: 10px;
    text-align: center;
    font-size: 18px;
  }

  .sub-page {
    min-height: calc(100vh - 322px);
    padding: 50px 0;
    margin: 8px 0;
  }
</style>
