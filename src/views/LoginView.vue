<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">CRM бухгалтерия</span>
      <div class="input-field">
        <input
            id="login"
            type="text"
            class="validate"
            v-model="this.login"
        >
        <label for="login">Login</label>
        <small
            class="helper-text invalid"
        >Login</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model="this.password"
        >
        <label for="password">Password</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import messagePlugin from "@/utils/message.plugin";
import messages from "@/utils/messages";
import axios from "axios";

export default {
  name: 'LoginView',
  data: () => ({
    login: '',
    password: ''
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      messagePlugin.message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      axios({
        url: 'https://home-bookkeeping-kstu-back.herokuapp.com/api/auth/sign-in',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-nHeaders': '*',
          'Access-Control-Allow-Methods': '*',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          withCredentials: true,
          mode: 'no-cors'
        },
        data: {
          login: this.login,
          password: this.password,
        }
      }).then(response => {
        if (response.status === 200) {
          messagePlugin.message("Вы авторизовались")

          global.userName = this.login
          global.token = response.data.token
          global.amount = response.data.amount
          global.currency = response.data.currency

          console.log(global)

          this.$router.push('/home')
        }
        if (response.status === 400) {
          messagePlugin.error("Не правильные данные")
        }
        if (response.status === 500) {
          messagePlugin.error("Ошибка сервера. Ожидайте пока исправим :)")
        }
      }).catch(error => {
        console.log(error)

        if (error.response.status === 400) {
          messagePlugin.error("Не правильные данные")
        }
        if (error.response.status === 500) {
          messagePlugin.error("Ошибка сервера. Ожидайте пока исправим :)")
        }
      });
    }
  }
}
</script>
