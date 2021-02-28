<template>
  <div>
    <h2>登録</h2>
    <label for="name">Email: </label>
    <input id="email" type="email" v-model="email">
    <br><br>
    <label for="password">パスワード: </label>
    <input id="password" v-model="password" type="password">
    <br><br>
    <button @click="register" class="btn btn-primary">送信</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
//登録画面
import firebase from 'firebase'
export default {
  data(){
    return{
      email:"",
      password:""
    };
  },
  methods :{
    register(){
      console.log('登録情報を送信しました。');
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        });

    }
  }
}
</script>

<style scoped>
.header-item{
  padding:10px;
  cursor: pointer;
}
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>