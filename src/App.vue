<template>
  <div id="app">
    <template v-if="!isAuthenticated" id="sub">
      <!--ログイン画面の実装をすること-->
      <router-link to="/login" class="header-item">
          ログイン
      </router-link>
      <router-link to="/register" class="header-item">
          登録
      </router-link>
      <!--一時的にボタンを設置-->
      <!--<button @click="pageChange">リーデングレコーダーを開く</button> -->
    </template>

  <template v-if="isAuthenticated" id="main">
    <div>
      <!--ログアウト画面の実装をすること-->
      <button class="el-button--mini" @click="logout">ログアウト</button>
    </div>
    <br>
    <h2>Reading Recorder</h2>

      <!--メインメニューを定義-->
      <el-menu mode="horizontal" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b">
          <!--ホーム画面-->
          <el-menu-item index="1">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <!--GoogleBooks検索-->
          <el-menu-item index="2">
            <router-link to="/search">Search</router-link>
          </el-menu-item>
          <!--お気に入り-->
          <el-menu-item index="4">
            <router-link to="/favorite">Favorite</router-link>
          </el-menu-item>
          <!--掲示板-->
          <el-menu-item index="5">
            <router-link to="/board">Board</router-link>
          </el-menu-item>
          <!--掲示板-->
          <el-menu-item index="6">
            <router-link to="/recommend">Recommend</router-link>
          </el-menu-item>
          <!--お問い合わせフォーム-->
          <el-menu-item index="7">
              <router-link to="/contForm">Contact</router-link>
          </el-menu-item>
          <!--サブメニューを定義-->
          <el-submenu index="3">
            <template v-slot:title>Support</template>
            <el-menu-item index="3-1">
              <a href="https://www.facebook.com/search/top/?q=%E5%B7%9D%E5%B6%8B%E5%BA%B7%E5%A4%AA" target="help">Author</a>
            </el-menu-item>
            <el-menu-item index="3-2">
              <a href="https://www.shinchosha.co.jp/search/genre/" target="help">Publisher</a>
            </el-menu-item>
            <el-menu-item>
              <a href="https://www.google.com/" target="_blank"> Google</a>
            </el-menu-item>
          </el-submenu>
        </el-menu>
    </template>
    <!--ルーティング時の表示領域を準備-->
    <router-view></router-view>
    <br>
      
  </div>
</template>

<script>
import { METHODS } from 'http';
import router from './router.js';
import firebase from 'firebase';

export default {
  name: 'app',
  data(){
    return{
      ninsyo: this.$store.state.isAuthenticated
    };
  },
  computed:{
    isAuthenticated(){
      return this.$store.state.isAuthenticated;
    }
  },
  methods:{
    logout(){
      this.$store.state.isAuthenticated = false;
      router.push("/login");
    },
    true(){
      this.$store.state.isAuthenticated = true;
    },
    false(){
      this.$store.state.isAuthenticated = false;
    }
  },
  beforeCreate(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        if(!this.ninsyo){
          router.push("/login");
          //以下の一文が反応しない（課題）
          this.ninsyo = true;
        }
        console.log("認証済み");
      } else {
        // No user is signed in.
        router.push("/login");
        //以下の一文が反応しない（課題）
        this.ninsyo = false;
        console.log("認証されていません");
      }
    });
  },
  
  created(){
    //ninsyoの値に応じてauthの値を変更する
    if(this.ninsyo){
      this.$store.state.isAuthenticated = true;
      document.getElementById("sub").style.display= "none";
      console.log("ログイン後");
    }else{
      this.$store.state.isAuthenticated = false; 
      console.log("ログイン前");
    }
  },
}
</script>

<style scoped>
.header-item{
  padding:10px;
  cursor: pointer;
  color: black;
}
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 800px;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 60px;
}

#app h2 {
  color: #009;
}

#nav {
  margin-bottom: 15px;
}

.el-menu-item a {
  color: #fff;
}
</style>
