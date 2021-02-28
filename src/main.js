import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import firebase from 'firebase'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

//プロダクションのコツをコンソールに表示してくれる機能
Vue.config.productionTip = false

//$httpプロパティを追加
Vue.prototype.$http = (url, opts) => fetch(url, opts)
// Vue.prototype.$http = fetch

var firebaseConfig = {
  apiKey: "AIzaSyAiCYCfpwIIsadNgRN3xFbn3u6RLHgF_oI",
  authDomain: "reading-recoder.firebaseapp.com",
  databaseURL: "https://reading-recoder.firebaseio.com",
  projectId: "reading-recoder",
  storageBucket: "reading-recoder.appspot.com",
  messagingSenderId: "177752633329",
  appId: "1:177752633329:web:4b50b99f316af24d19de50",
  measurementId: "G-CY446JW2GE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


 
//アプリを起動(以下がrouterやstoreを使った際の標準的な記述)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
