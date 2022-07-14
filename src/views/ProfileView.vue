<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="login"
            type="text"
            v-model="this.userName"
        >
        <label for="description">Имя</label>
        <span
            class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import messagePlugin from "@/utils/message.plugin";

export default {
  name: 'ProfileView',
  data: () => ({
    userName: '',
  }),
  methods: {
    async submitHandler() {
      axios({
        url: 'https://home-bookkeeping-kstu-back.herokuapp.com/api/profile/update-user-name',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-nHeaders': '*',
          'Access-Control-Allow-Methods': '*',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Authorization" : global.token,
          withCredentials: true,
          mode: 'no-cors'
        },
        data: {
          userName: this.userName,
        }
      }).then(response => {
        if (response.status === 200) {
          messagePlugin.message("Предыдуший логин: => " + response.data.oldName)
          messagePlugin.message("Новый логин: => " + response.data.newName)

          global.userName = response.data.newName
          this.$router.push('/profile')
        }
        if (response.status === 400) {
          messagePlugin.error("Не правильные данные")
        }
        if (response.status === 500) {
          messagePlugin.error("Ошибка сервера. Ожидайте пока исправим :)")
        }
      }).catch(error => {
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
