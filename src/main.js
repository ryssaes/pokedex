import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';


import './styles/main.scss'

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(InfiniteLoading, {});

new Vue({
  render: h => h(App),
}).$mount('#root');
