
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $http;
  }
}

declare global {
  interface Window {
    globalData;
  }
}
