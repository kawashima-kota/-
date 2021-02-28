import Vue from 'vue'
import Router from 'vue-router'
import BookSearch from './components/BookSearch.vue'
import BookForm from './components/BookForm.vue'
import Favorite from './components/BookFavorite.vue'
import BookBoard from './components/BookBoard.vue'
import BookRecommend from './components/BookRecommend.vue'
import ContForm from './components/ContForm.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //トップページ（登録済みレビューの一覧）
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    //GoogleBooksの検索フォーム
    {
      path: '/search',
      name: 'search',
      component: BookSearch
    },
    //書籍レビューのためのフォーム
    {
      path: '/form',
      name: 'form',
      component: BookForm
    },
    //お気に入りの書籍一覧
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite
    },
    //掲示板
    {
      path: '/board',
      name: 'board',
      component: BookBoard
    },
    //みんなのおすすめ
    {
      path: '/recommend',
      name: 'recommend',
      component: BookRecommend
    },
    //お問い合わせフォーム
    {
      path: '/contForm',
      name: 'contForm',
      component: ContForm
    },
    //登録画面
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    //ログイン画面
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //公開するフォーム
    {
      path: '',
      name: '',
    },
    //最終的な受け皿
    { path: '*', redirect: {name: 'home'}}
  ]
})
