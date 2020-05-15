export const state = () => ({
  currentTimer: '00:00',
  timeInterval: '', // for resetting timer;
  pomCounter: 0,
  pomTimer: true,
  s: 0,
  m: 0
})
export const mutations = {
  START_TIMER (state) {
    state.s++
    if (state.s === 60) {
      state.m++
      state.s = 0
    }
    state.currentTimer =
      String(state.m).padStart(2, '0') +
      ':' +
      String(state.s).padStart(2, '0')
  },
  SET_TIMER (state, timer) {
    // for resetting timer
    state.timeInterval = timer
  },
  STOP_TIMER (state) {
    clearInterval(state.timeInterval)
  },
  RESET_TIMER (state) {
    state.s = 0
    state.m = 0
    state.currentTimer = '00:00'
  },
  SET_POMODORO (state) {
    state.pomTimer = !state.pomTimer
  },
  INCREMENT_POM (state) {
    if (state.pomCounter === 4) {
      state.pomCounter = 0
    } else {
      state.pomCounter++
    }
  }
}
export const actions = {
  START_TIMER (context, timer) {
    timer = setInterval(function () {
      context.commit('START_TIMER')
      if (context.state.pomTimer === true) {
        if (context.state.m === 25) {
          context.commit('SET_POMODORO')
          context.commit('RESET_TIMER')
          context.commit('INCREMENT_POM')
        }
      } else if (context.state.pomCounter === 4) {
        if (context.state.m === 15) {
          context.commit('SET_POMODORO')
          context.commit('RESET_TIMER')
          context.commit('INCREMENT_POM')
        }
      } else if (context.state.m === 5) {
        context.commit('SET_POMODORO')
        context.commit('RESET_TIMER')
      }
    }, 1000)
    context.commit('SET_TIMER', timer)
  },
  STOP_TIMER (context) {
    context.commit('STOP_TIMER')
    context.commit('RESET_TIMER')
  },
  PAUSE_TIMER (context) {
    context.commit('STOP_TIMER')
  }
}
