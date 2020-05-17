<template>
  <div>
    <p class="timer">
      {{ timer }}
    </p>
    <button @click="startTimer()">
      Start
    </button>
    <button @click="pauseTimer()">
      Pause
    </button>
    <button @click="stopTimer()">
      Stop
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    timer () {
      return this.$store.state.currentTimer
    }
  },
  methods: {
    ...mapActions({
      startTimer: 'START_TIMER',
      pauseTimer: 'PAUSE_TIMER',
      stopTimer: 'STOP_TIMER'
    })
  }
}
</script>

<style scoped>
.timer {
  font-size: 5rem;
  font-weight: 500;
}
</style>
