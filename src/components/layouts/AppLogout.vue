<template>
  <div class="logout">
    <b-modal id="modal_logout" ref="modalLogout" title="로그아웃" hide-footer centered>
      <b-form @submit.prevent="logout">
        <p class="auth-complete">
          정말 로그아웃 하시겠습니까?
        </p>
        <b-btn type="submit" class="w-100 mt-2" variant="primary">로그아웃</b-btn>
      </b-form>
    </b-modal>
    <b-modal ref="modalLogoutComplete" size="sm" hide-header centered>
      <p class="auth-complete">
        로그아웃이 완료되었습니다.
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
    export default class AppLogout extends Vue {
      private users:object = window.globalData.users;
      private currentUser:object = window.globalData.currentUser;

      private hideCompleteModal() {
        this.$refs.modalLogoutComplete.hide();
      }

      private logout() {
        this.currentUser.pop();

        this.$refs.modalLogoutComplete.show();
      }
    }
</script>

<style lang="scss">
</style>
