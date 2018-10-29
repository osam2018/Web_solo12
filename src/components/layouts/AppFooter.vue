<template>
    <div class="footer">
      <b-container>
        <div class="footer-logo">Movie App</div>
        <ul class="footer-list">
          <li>회사소개</li>
          <li>채용정보</li>
          <li>제휴/광고/부대사업 문의</li>
          <li>이용약관</li>
          <li>개인정보 처리방침</li>
          <li>고객센터</li>
          <li>윤리경영</li>
        </ul>
        <div class="footer-sns">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-apple"></i>
        </div>
        <div class="footer-address">
          강원특별시 화천구 사내면 6685, 2층 MovieApp(주) (간부연구실, 음향지원실)<br>
          대표자명 김동진 | 개인정보보호 책임자 경영지원실 일병 유한종<br>
          사업자등록번호 211-86-12345 | 전입병신고번호 제 30호
        </div>
        <div class="footer-copy">
          Copyright 2018 by Rok Army, Army. All rights reserved.
        </div>
      </b-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class AppFooter extends Vue {

    }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 30px 0;
    background: #222;
    color: #999;
    font-size: 14px;

    .container {
      position: relative;
    }

    &-logo {
      font-size: 1.25rem;
    }

    &-list {
      list-style: none;
      margin: 1rem 0;
      padding: 0;

      li {
        display: inline-block;

        &:not(:last-child):after {
          content: '|';
          opacity: .5;
          margin: 0 .7em;
        }
      }
    }

    &-sns,
    &-copy {
      position: absolute;
      right: 0;
    }

    &-copy {
      bottom: 0;
    }

    &-sns {
      top: 0;

      .fab {
        font-size: 24px;
        margin-left: 1rem;
        cursor: pointer;
      }
    }
  }
</style>
