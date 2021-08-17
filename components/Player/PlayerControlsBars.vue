<template>
  <div>
    <v-toolbar flat height="90">
      <v-btn text icon @click="toggleMute">
        <template v-if="!muted">
          <v-icon v-if="volume >= 0.5">
            mdi-volume-plus
          </v-icon>
          <v-icon v-else-if="volume > 0">
            mdi-volume-minus
          </v-icon>
          <v-icon v-else>
            mdi-volume-off
          </v-icon>
        </template>
        <v-icon v-show="muted">
          mdi-volume-off
        </v-icon>
      </v-btn>
      <v-slider v-model="volume" max="1" step="0.1" @input="updateVolume(volume)" />
      {{ volume * 100 + '%' }}
      <v-spacer />
      <v-btn outlined fab small color="light-blue" @click="skipTrack('prev')">
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="stopTrack">
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn outlined fab color="light-blue" @click="playTrack()">
        <v-icon large>
          mdi-play
        </v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="pauseTrack">
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="skipTrack('next')">
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text icon @click="toggleLoop">
        <v-icon v-if="loop" color="light-blue">
          mdi-repeat
        </v-icon>
        <v-icon v-else color="blue-grey">
          mdi-repeat
        </v-icon>
      </v-btn>
      <v-btn text icon @click="toggleShuffle">
        <v-icon v-if="shuffle" color="light-blue">
          mdi-shuffle
        </v-icon>
        <v-icon v-else color="blue-grey">
          mdi-shuffle
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar flat height="40">
      <v-progress-linear ref="progressBar" v-model="trackProgress" height="40" @click="updateSeek($event)" />
    </v-toolbar>
  </div>
</template>

<script>

import { Howler } from 'howler'

export default {
  props: {
    loop: Boolean,
    shuffle: Boolean,
    progress: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      volume: 0.5,
      muted: false
    }
  },
  computed: {
    console: () => console,
    window: () => window,
    trackProgress: {
      get () {
        return this.progress * 100
      },
      set (val) {
        this.currentPro = val
      }

    },
    currentPro: {
      get () {
        return this.progress
      },
      set () {

      }

    }
  },
  created () {
    Howler.volume(this.volume)
  },
  methods: {
    playTrack (index) {
      this.$emit('playtrack', index)
    },
    pauseTrack () {
      this.$emit('pausetrack')
    },
    stopTrack () {
      this.$emit('stoptrack')
    },
    skipTrack (direction) {
      this.$emit('skiptrack', direction)
    },
    updateVolume (volume) {
      Howler.volume(volume)
    },
    toggleMute () {
      Howler.mute(!this.muted)
      this.muted = !this.muted
    },
    toggleLoop () {
      this.$emit('toggleloop', !this.loop)
    },
    toggleShuffle () {
      this.$emit('toggleshuffle', !this.shuffle)
    },
    updateSeek (event) {
      const el = this.$refs.progressBar
      console.log(el)
      // const el = document.querySelector('.progress-linear__bar')
      const mousePos = event.offsetX
      const elWidth = el.clientWidth
      const percents = (mousePos / elWidth) * 100
      this.$emit('updateseek', percents)
    }
  }
}
</script>
