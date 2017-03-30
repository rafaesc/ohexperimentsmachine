import 'es6-promise/auto';
import initial from './initial';
import { isIE } from './utils/Utils';
import Vue from 'vue';
import store from './store';
import App from './App.vue';
import Upgrade from './Upgrade.vue';

let templateRender = ( isIE() ) ? Upgrade : App;
Vue.config.devtools = false;

new Vue({
  store,
  el: '#ohexperimentsmachine',
  render: h => h(templateRender)
});
