import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UPDATE_CURRENT, UPDATE_BOOK, UPDATE_FAVORITEBOOK } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //レビュー+書籍情報
    books: [],
    //お気に入り登録したの書籍情報
    favoriteBooks:[],
    //現在編集/選択中の書籍
    current: null,
    //認証判定
    isAuthenticated:false,
    //数
    number:10,
  },
  getters: {
    //登録済みのレビュー数
    bookCount(state) {
      return state.books.length
    },
    //すべてのレビュー情報
    allBooks(state) {
      return state.books
    },
    //指定されたページのレビュー情報(引数はページ番号)
    getRangeByPage(state) {
      return page => {
        const SIZE = 3
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    },
    //指定されたidのレビュー情報
    getBookById(state) {
      return id => {
        //引数idをキーに配列booksを検索
        return state.books.find(book => book.id === id)
      }
    },
    //現在編集中の書籍
    current(state) {
      return state.current;
    },
    //お気に入り登録した書籍の数
    favoriteBookCount(state){
      return state.favoriteBooks.length
    },
    getRangeByPage2(state) {
      return page => {
        const SIZE = 3
        return state.favoriteBooks.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    }
  },
  mutations: {
    //編集中の書籍（current）を更新
    [UPDATE_CURRENT](state, payload) {
      state.current = payload
    },
    //レビュー情報を更新(引数payloadは更新された書籍情報)
    [UPDATE_BOOK](state, payload) {
      //id値(payload.id)で既存のレビューを検索
      let b = this.getters.getBookById(payload.id)
      if (b) {
        //既存のレビュー情報がある場合は，更新情報（payload）で上書き
        Object.assign(b, payload)
      } else {
        //既存の情報がなければ，新規としてstate.booksに追加
        state.books.push(payload)
      }
    },
    [UPDATE_FAVORITEBOOK](state, payload){
      state.favoriteBooks.push(payload)
    }
  },
  //ミューテーションに対応する同名のアクション
  actions: {
    [UPDATE_CURRENT]({ commit }, payload) {
      commit(UPDATE_CURRENT, payload)
    },
    [UPDATE_BOOK]({ commit }, payload) {
      commit(UPDATE_BOOK, payload)
    },
    [UPDATE_FAVORITEBOOK]({ commit }, payload) {
      commit(UPDATE_FAVORITEBOOK, payload)
    }
  },
  //ストレージ保存のためのプラグインを有効化
  plugins: [createPersistedState({
    key: 'reading-recorder',
    storage: localStorage
  })]
})
