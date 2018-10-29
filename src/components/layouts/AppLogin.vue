<template>
  <div class="login">
    <b-modal id="modal_login" ref="modalLogin" title="로그인" @hidden="onHidden" hide-footer centered>
      <b-form @submit.prevent="login">
        <b-form-group label="아이디 (ID)" label-for="login_id">
          <b-form-input v-model="form.id" id="login_id" type="text" placeholder="아이디 (ID)" required></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호 (Password)" label-for="login_password">
          <b-form-input v-model="form.password" id="login_password" type="password" placeholder="비밀번호 (Password)" required></b-form-input>
        </b-form-group>
        <b-btn type="submit" class="w-100" variant="primary" size="lg">로그인</b-btn>
        <p>
          아직 회원이 아니신가요?
          <a class="float-right text-primary" v-b-modal.modal_register>회원가입</a>
        </p>
      </b-form>
    </b-modal>
    <b-modal ref="modalLoginComplete" size="sm" hide-header centered>
      <p class="auth-complete">
        로그인이 완료되었습니다.
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
    export default class AppLogin extends Vue {
      private users:object = window.globalData.users;
      private currentUser:object = window.globalData.currentUser;
      private form:object = {
        id: '',
        password: ''
      }

      private onHidden() {
        this.form.id = '';
        this.form.password = '';
      }

      private hideCompleteModal() {
        this.$refs.modalLoginComplete.hide();
      }

      private login() {
        for(var i in this.users) {
          if(this.users[i].id === this.form.id
            && this.users[i].password === this.form.password) {
            this.currentUser.splice(this.currentUser.length);
            this.currentUser.push({
              id: this.users[i].id,
              name: this.users[i].name
            });

            this.$refs.modalLoginComplete.show();

            return true;
          }
        }

        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    }
</script>

<style lang="scss">
</style>
