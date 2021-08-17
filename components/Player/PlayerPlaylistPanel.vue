<template>
  <v-card height="330" :class="{playlist}">
    <v-list>
      <v-list-item
        v-for="(track, index) in playlist"
        v-show="track.display"
        :key="track.title"
        :class="[{selected: track === selectedTrack}, {even: index % 2 == 0}]"
      >
        <v-list-item-content @click="selectTrack(track)" @dblclick="playTrack()">
          <v-list-item-title>{{ index | numbers }} {{ track.artist }} - {{ track.title }}</v-list-item-title>
        </v-list-item-content>
        <v-spacer />
        {{ track.howl.duration() | minutes }}
      </v-list-item>
    </v-list>
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
    playlist: Array,
    selectedTrack: Object
  },
  methods: {
    selectTrack (track) {
      this.$emit('selecttrack', track)
    },
    playTrack (index) {
      this.$emit('playtrack', index)
    }
  }
}
</script>

<style scoped>
  .selected {
    background-color:  orange !important;
  }
  .even {
    background-color: #505050
  }
  .playlist {
    overflow: auto
  }
</style>
