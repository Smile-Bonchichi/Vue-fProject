<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select>
          <option
          >name cat
          </option>
        </select>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="this.type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="this.type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model="this.amount"
        >
        <span class="helper-text invalid">amount</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="this.description"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid">description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import messagePlugin from "@/utils/message.plugin";

export default {
  name: 'RecordView',
  data: () => ({
    type: '',
    amount: 0,
    description: ''
  }),
  methods: {
    async submitHandler() {
      axios({
        url: 'https://home-bookkeeping-kstu-back.herokuapp.com/api/record/add-new-record',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-nHeaders': '*',
          'Access-Control-Allow-Methods': '*',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Authorization": global.token,
          withCredentials: true,
          mode: 'no-cors'
        },
        data: {
          type: this.type,
          amount: this.amount,
          description: this.description
        }
      }).then(response => {
        if (response.status === 200) {
          messagePlugin.message("Запись добавлена")

          global.amount = response.data.amount
          this.$router.push('/')
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
