<template>
  <v-app dark>
    <v-main>
      <v-container>
        <!-- <player-title-bar /> -->
        <player-info-panel
          :track-info="getTrackInfo"
        />
        <player-controls-bars
          :loop="loop"
          :shuffle="shuffle"
          :progress="progress"
          @playtrack="play"
          @pausetrack="pause"
          @stoptrack="stop"
          @skiptrack="skip"
          @toggleloop="toggleLoop"
          @toggleshuffle="toggleShuffle"
          @updateseek="setSeek"
        />
        <player-playlist-panel
          :playlist="playlist"
          :selected-track="selectedTrack"
          @selecttrack="selectTrack"
          @playtrack="play"
        />
        <player-search-bar
          :playlist="playlist"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { Howl } from 'howler'

// import PlayerTitleBar from '~/components/Player/PlayerTitleBar.vue'
import PlayerPlaylistPanel from '~/components/Player/PlayerPlaylistPanel.vue'
import PlayerControlsBars from '~/components/Player/PlayerControlsBars.vue'
import PlayerInfoPanel from '~/components/Player/PlayerInfoPanel.vue'
import PlayerSearchBar from '~/components/Player/PlayerSearchBar.vue'

export default {
  components: {
    // PlayerTitleBar,
    PlayerPlaylistPanel,
    PlayerControlsBars,
    PlayerInfoPanel,
    PlayerSearchBar
  },
  data () {
    return {
      playlist: [
        { title: "Streets of Sant'Ivo", artist: 'Ask Again', howl: null, display: true },
        { title: 'Remember the Way', artist: 'Ask Again', howl: null, display: true },
        { title: 'Guardians', artist: 'Ask Again', howl: null, display: true },
        { title: 'Crusade of The Castellan', artist: 'Ask Again', howl: null, display: true },
        { title: 'Land of a Folk Divided', artist: 'Ask Again', howl: null, display: true },
        { title: 'An Innocent Sword', artist: 'Ask Again', howl: null, display: true }
      ],
      selectedTrack: null,
      index: 0,
      playing: false,
      loop: false,
      shuffle: false,
      seek: 0
    }
  },
  computed: {
    currentTrack () {
      return this.playlist[this.index]
    },
    progress () {
      if (this.currentTrack.howl.duration() === 0) { return 0 }
      return this.seek / this.currentTrack.howl.duration()
    },
    getTrackInfo () {
      const artist = this.currentTrack.artist
      const title = this.currentTrack.title
      const seek = this.seek
      const duration = this.currentTrack.howl.duration()
      return {
        artist,
        title,
        seek,
        duration
      }
    }
  },
  watch: {
    playing (playing) {
      this.seek = this.currentTrack.howl.seek()
      let updateSeek
      if (playing) {
        updateSeek = setInterval(() => {
          this.seek = this.currentTrack.howl.seek()
        }, 250)
      } else {
        clearInterval(updateSeek)
      }
    }
  },
  created () {
    this.playlist.forEach((track) => {
      const file = track.title.replace(/\s/g, '_')
      track.howl = new Howl({
        src: [`./playlist/${file}.mp3`],
        onend: () => {
          if (this.loop) {
            this.play(this.index)
          } else {
            this.skip('next')
          }
        }
      })
    })
  },
  methods: {
    selectTrack (track) {
      this.selectedTrack = track
    },
    play (index) {
      const selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)

      if (typeof index === 'number') {
        // let index
      } else if (this.selectedTrack) {
        if (this.selectedTrack !== this.currentTrack) {
          this.stop()
        }
        index = selectedTrackIndex
      } else {
        index = this.index
      }

      const track = this.playlist[index].howl

      if (track.playing()) {
        return
      } else {
        track.play()
      }

      this.selectedTrack = this.playlist[index]
      this.playing = true
      this.index = index
    },
    pause () {
      this.currentTrack.howl.pause()
      this.playing = false
    },
    stop () {
      this.currentTrack.howl.stop()
      this.playing = false
    },
    skip (direction) {
      let index = 0
      const lastIndex = this.playlist.length - 1

      if (this.shuffle) {
        index = Math.round(Math.random() * lastIndex)
        while (index === this.index) {
          index = Math.round(Math.random() * lastIndex)
        }
      } else if (direction === 'next') {
        index = this.index + 1
        if (index >= this.playlist.length) {
          index = 0
        }
      } else {
        index = this.index - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
      }

      this.skipTo(index)
    },
    skipTo (index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop()
      }

      this.play(index)
    },
    toggleLoop (value) {
      this.loop = value
    },
    toggleShuffle (value) {
      this.shuffle = value
    },
    setSeek (percents) {
      const track = this.currentTrack.howl

      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    }
  }
}
</script>
