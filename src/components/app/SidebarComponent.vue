<template>
  <ul class="sidenav app-sidenav open" :class="{open: value}">

    <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact">
      <li>
        <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Счет', url: '/home', exact: true},
      {title: 'История', url: '/history'},
      {title: 'Новая запись', url: '/record'},
    ]
  })
}
</script>
