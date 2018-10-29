import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import ElementUILang from 'element-ui/lib/locale/lang/ko'
import ElementUILocale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import data from "./datas/data"

Vue.prototype.$globalBus = new Vue();

window.globalData = data;

ElementUILocale.use(ElementUILang);

Vue.$http = axios;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
