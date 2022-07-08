<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">CRM бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
        >Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
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

export default {
  name: 'LoginView',
  data: () => ({
    email: '',
    password: ''
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      messagePlugin.message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password
      }
    }
  }
}
</script>
