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
export default {
  computed: {
    timer () {
      return this.$store.state.currentTimer
    }
  },
  methods: {
    startTimer () {
      this.$store.dispatch('START_TIMER')
    },
    pauseTimer () {
      this.$store.dispatch('PAUSE_TIMER')
    },
    stopTimer () {
      this.$store.dispatch('STOP_TIMER')
    }
  }
}
</script>

<style scoped>
.timer {
  font-size: 5rem;
  font-weight: 500;
}
</style>
