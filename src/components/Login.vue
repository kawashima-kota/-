<template>
  <div>
    <h2>ログイン</h2>
      <label for="name">Email: </label>
      <input id="email" type="email" v-model="email">
      <br><br>
      <label for="password">パスワード: </label>
      <input id="password" v-model="password" type="password">
      <br><br>
    <button @click="login" class="btn btn-primary">送信</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
//ログイン画面
import firebase from 'firebase'
export default {
  data(){
    return{
      email:"",
      password:""
    };
  },
  methods:{
     login(){
      console.log('ログイン情報を送信しました。');
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          alert('ログインに成功しました')
          this.$router.push('/')
          this.$store.state.isAuthenticated = true;
        },
        err => {
          alert(err.message)
        });
    }
  }
};
</script>

<style scoped>
.header-item{
  padding:10px;
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>

</style>