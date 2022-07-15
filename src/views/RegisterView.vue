<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="login"
            type="text"
            v-model="this.login"
        >
        <label for="login">Логин</label>
        <small class="helper-text invalid">Login</small>
      </div>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model="this.email"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model="this.password"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
      <p>
        <label>
          <input type="checkbox"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import messagePlugin from "@/utils/message.plugin";

export default {
  login: 'RegisterView',

  data: () => ({
    email: '',
    password: '',
    login: '',
    token: ''
  }),
  methods: {
    async submitHandler() {
      axios({
        url: 'https://home-bookkeeping-kstu-back.herokuapp.com/api/auth/sign-up',
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
          email: this.email,
          password: this.password,
          login: this.login
        }
      }).then(response => {
        if (response.status === 200) {
          messagePlugin.message("Аккаунт создан")
          this.$router.push('/login')
        }
        if (response.status === 400) {
          messagePlugin.error("Не правильные данные")
        }
        if (response.status === 500) {
          messagePlugin.error("Такой пользователь уже есть")
        }
      }).catch(error => {
        if (error.response.status === 400) {
          messagePlugin.error("Не правильные данные")
        }
        if (error.response.status === 500) {
          messagePlugin.error("Такой пользователь уже есть")
        }
      });
    }
  }
}
</script>
