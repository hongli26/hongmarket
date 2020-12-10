import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import App from './App.vue'
//import env from './env'

//adjust it based on how the front end implemented the cross-domain method
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
//get baseURL according to the environment variables
//axios.defaults.baseURL = env.baseURL;
//interceptor of wrong API request
axios.interceptors.response.use(function(response){
  let res = response.data;
  let path = location.hash;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if(path != '#/index'){
      window.location.href = '/#/login';
    }
  }else{
    alert(res.msg);
  }
});

Vue.use(VueAxios, axios);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
