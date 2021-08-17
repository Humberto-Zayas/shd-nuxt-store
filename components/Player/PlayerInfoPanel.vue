<template>
  <v-card height="60">
    <v-card-title>
      <h2>{{ trackInfo.artist }} - {{ trackInfo.title }}</h2>
      <v-spacer />
      <h3>{{ trackInfo.seek | minutes }}/{{ trackInfo.duration | minutes }}</h3>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  filters: {
    numbers: (value) => {
      const number = value + 1
      if (number < 10) {
        return '0' + number + '.'
      }
      return number + '.'
    },
    minutes: (value) => {
      if (!value || typeof value !== 'number') { return '00:00' }
      let min = parseInt(value / 60)
      let sec = parseInt(value % 60)
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      value = min + ':' + sec
      return value
    }
  },
  props: {
    trackInfo: Object
  }
}
</script>
