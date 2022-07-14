<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
    </div>

    <div class="row">
      <div class="col s12 m6 l12">
        <div class="card light-blue bill-card center">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p class="currency-line center">
              <span class="card-content white-text col s12 m6 l12">{{ getAmount() + " " + " " + getCurrency() }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    getAmount() {
      return global.amount
    },
    getCurrency() {
      return global.currency
    }
  }
}
</script>
