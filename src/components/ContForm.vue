<template>
  <div class="form-container container" id="app">
  <h2>お問い合わせフォーム</h2>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">名前</label>
      <div class="form-row">
        <div class="col">
          <input v-model="form.firstName" type="text" class="form-control" placeholder="名字">
          <small v-bind:class="{'is-hide':validation.firstName}"  class="form-text text-info">{{ errorMessage.firstName }}</small>
        </div>
        <div class="col">
          <input v-model="form.lastName" type="text" class="form-control" placeholder="名前">
          <small v-bind:class="{'is-hide':validation.lastName}"  class="form-text text-info">{{ errorMessage.lastName }}</small>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">電話番号</label>
      <input v-model="form.tel" type="tel" class="form-control" id="exampleInputEmail1" placeholder="電話番号">
      <small v-bind:class="{'is-hide':validation.tel}" class="form-text text-info">{{ errorMessage.tel }}</small>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">メールアドレス</label>
      <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="メールアドレス">
      <small v-bind:class="{'is-hide':validation.email}" class="form-text text-info">{{ errorMessage.email }}</small>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">お問い合わせ内容</label>
      <textarea v-model="form.text" class="form-control" id="exampleInputEmail1" placeholder="お問い合わせ内容">
      </textarea>
      <small v-bind:class="{'is-hide':validation.text}" class="form-text text-info">{{ errorMessage.text}}</small>
    </div>
  </form>

  <div class="btn-container"><button type="submit" v-bind:disabled="!isValid" class="btn btn-primary" @click="submit()">送信</button></div>
</div>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase'

export default {
  name: 'app',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        tel: '',
        email: '',
        text: ''
      },
      errorMessage: {
        firstName: '名字を入力してください',
        lastName: '名前を入力してください',
        tel: '電話番号を入力してください',
        email: 'メールアドレスを入力してください',
        text: "お問い合わせ内容を入力してください"
      }
    }
  },
  computed: {
    validation() {
      const form = this.form
        return {
          firstName : !!form.firstName,
          lastName : !!form.lastName,
          tel : (() => {
            if(!!form.tel) {
              form.tel.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'')
              if (!form.tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
                return false
              }
              return true
            } else {
              return false
            }
          })(),
          email : (() => {
            if(!!form.email) {
              if (!form.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
                return false
              }
              return true
            } else {
              return false
            }
          })(),
          text: (() => {
            if(!!form.text){
              return true
            }else{
              return false
            }
          })()
        }
      },
      isValid() {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
      })
    }
  },
  methods:{
    //データベース連携をさせる
    submit(){
        var db = firebase.firestore();
        db.collection("message").add({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          tel: this.form.tel,
          email: this.form.email,
          text: this.form.text
        })
        /*
        フォーム送信後にデータベースの中身をコンソールに出力
        .then(
          db.collection("message").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
            })
          })
        ) 
        */       
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

        //お知らせの通知
        window.alert("フォームは正常に送信されました。");
        console.log("フォームは正常に送信されました。");

        //入力内容の初期化
        this.form.firstName = "";
        this.form.lastName = "";
        this.form.tel = "";
        this.form.email = "";
        this.form.text = "";
        //トップへリダイレクト
        this.$router.push('/')
    },
  }
}
</script>

<style>

</style>