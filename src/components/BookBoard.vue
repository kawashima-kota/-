<template>
  <div>
    <h2>掲示板</h2>
    <!-- v-forでデータベース内の情報を表示 -->
    <div v-for="post in posts" :key="post.name">
      <div>名前：{{post.name}}</div>
      <div>コメント：{{post.comment}}</div>
    </div>
    <hr>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム: </label>
    <input id="name" type="text" v-model="name">
    <br><br>
    <label for="comment">コメント: </label>
    <textarea id="comment" v-model="comment"></textarea>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
  </div> 
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase'

//掲示板アプリの実装
export default {
  data(){
    return{
      name:"",
      comment:"",
      posts:[]
    }
  },
  computed:{
    number(){
      return this.$store.state.number;
    }
  },
  //クリエイトされた時にデータベース内の情報を取得
  created(){
    var db = firebase.firestore();
    db.collection("comment").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data());
      });
    });
  },
  methods:{
    //ボタンを押すとデータベースのデータを反映
    createComment(){
      var db = firebase.firestore();
      db.collection("comment").add({
        name: this.name,
        comment: this.comment
      })
      .then(
        this.posts.push({
        name: this.name,
        comment: this.comment
      })
      )
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.name = "";
      this.comment = "";
    }
  }
}
</script>

<style>

</style>