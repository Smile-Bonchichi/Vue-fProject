<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Описание</th>
          <th>Тип</th>
        </tr>
        </thead>

        <tbody
            v-for="history in histories"
            :key="history.rowNumber"
        >
        <tr>
          <td>{{ history.rowNumber }}</td>
          <td>{{ history.amount }}</td>
          <td>{{ getFormatDate(history.recordDate) }}</td>
          <td>{{ history.description }}</td>
          <td>
            <span class="white-text badge black">{{ history.type }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import messagePlugin from "@/utils/message.plugin";

export default {
  name: 'HistoryView',
  data: () => ({
    histories: [{rowNumber: 0, amount: 0, recordDate: '', description: '', type: ''}]
  }),
  methods: {
    getFormatDate(value) {
      return value
    }
  },
  mounted() {
    axios({
      url: 'https://home-bookkeeping-kstu-back.herokuapp.com/api/history/get-all',
      method: 'GET',
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
    }).then(response => {
      if (response.status === 200) {
        this.histories = response.data
      }
      if (response.status === 500) {
        messagePlugin.error("Ошибка сервера. Ожидайте пока исправим :)")
      }
    }).catch(error => {
      if (error.response.status === 500) {
        messagePlugin.error("Ошибка сервера. Ожидайте пока исправим :)")
      }
    });
  }
}
</script>
