<template>
  <div class="list">
    <p>{{ favoriteBookCount }}件がお気に入り登録されています。</p>
    <!--書籍情報を一覧表示(キーはid)-->
    <!--以下のfavoriteBooksがdataを参照してしまっているので、変更すべき-->
    <BookInfo 
      v-for="(b, i) of favoriteBooks"
      :linkable="true" :book="b" :index="i + 1" :key="b.isbn">
    </BookInfo>
    <!--ぺージャーを生成-->
    <div>
      <el-pagination background layout="prev, pager, next" prev-text="前へ" next-text="次へ"
        :total="favoriteBookCount" :page-size="3" @current-change="onchange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookInfo from '@/components/BookInfo.vue' ;
export default {

  //booksは登録済みのレビュー情報(配列)
  data() {
    return {
      favoriteBooks: []
    }
  },
  //ローカルコンポーネントを登録
  components: {
    BookInfo
  },

  //以下の書き換えが必要
  //vuexにお気に入り追加のコードを記載する必要がある
  computed: mapGetters([ 'favoriteBookCount', 'getRangeByPage2' ]),
  
  methods: {
    //ページが変更された場合に，現在ページのレビュー情報を再セット
    onchange(page) {
      this.favoriteBooks = this.getRangeByPage2(page)
    },
  },

  //初期化（マウント）時に一ページ目のレビュー情報を取得
  mounted() {
    this.favoriteBooks = this.getRangeByPage2(1)
  }
}
</script>