<template>
  <div class="register">
    <b-modal id="modal_register" ref="modalRegister" @hidden="onHidden" title="회원가입" hide-footer centered>
      <b-form @submit.prevent="register">
        <b-form-group label="아이디 (ID)" label-for="register_id">
          <b-form-input v-model="form.id" id="register_id" type="text" placeholder="아이디 (ID)" required></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호 (Password)" label-for="register_password">
          <b-form-input v-model="form.password" id="register_password" type="password" placeholder="비밀번호 (Password)" required></b-form-input>
        </b-form-group>
        <b-form-group label="이름 (Name)" label-for="register_name">
          <b-form-input v-model="form.name" id="register_name" type="text" placeholder="이름 (Name)" required></b-form-input>
        </b-form-group>
        <b-btn type="submit" class="w-100" variant="primary" size="lg">회원가입</b-btn>
        <p>
          이미 회원입니까?
          <a class="float-right text-primary" v-b-modal.modal_login>로그인</a>
        </p>
      </b-form>
    </b-modal>
    <b-modal ref="modalRegisterComplete" size="sm" hide-header centered>
      <p class="auth-complete">
        회원가입이 완료되었습니다.
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
    export default class AppRegister extends Vue {
      private users:object = window.globalData.users;
      private form:object = {
        id: '',
        password: '',
        name: ''
      }

      private onHidden() {
        this.form.id = '';
        this.form.password = '';
        this.form.name = '';
      }

      private hideCompleteModal() {
        this.$refs.modalRegisterComplete.hide();
      }

      private register() {
        for(var i in this.users) {
          if(this.users[i].id === this.form.id) {
            alert('이미 사용중인 \'아이디\' 입니다.');
            return false;
          } else if(this.users[i].name === this.form.name) {
            alert('이미 사용중인 \'이름\' 입니다.');
            return false;
          }
        }

        this.users.push({
          id: this.form.id,
          password: this.form.password,
          name: this.form.name
        });

        // this.$refs.modalRegister.hide();
        this.$refs.modalRegisterComplete.show();
      }
    }
</script>

<style lang="scss" scoped>
</style>
