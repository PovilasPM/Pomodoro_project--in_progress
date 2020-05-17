export const state = () => ({
  currentTask: {
    id: 1,
    value: '',
    pom: 0,
    time: ''
  },
  taskList: [],
  currentTimer: '00:00',
  timeInterval: '', // for resetting timer;
  pomCounter: 0,
  pomTimer: true,
  s: 0,
  m: 0
})
export const mutations = {
  REMOVE_TASK (state, task) {
    const curTask = state.taskList.findIndex(obj => obj.id === task)
    state.taskList.splice(curTask, 1)
  },
  TASK_TIME (state) {
    const pomTotal = state.currentTask.pom * 25
    let pomH = Math.floor(pomTotal / 60)
    let pomM
    if (pomH < 1) {
      pomM = pomTotal
      pomH = 0
    }
    pomM = pomTotal - pomH * 60
    state.currentTask.time = String(pomH).padStart(2, '0') + ':' + String(pomM).padStart(2, '0')
  },
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
  },
  NEW_TASK (state, value) {
    state.currentTask.value = value
  },
  TASK_COUNTER (state, value) {
    if (value === 'add') {
      state.currentTask.pom++
    } else if (state.currentTask.pom > 0) {
      state.currentTask.pom--
    }
  },
  TASK_POM (state, payload) {
    const taskChange = state.taskList.find(obj => obj.id === payload.task)
    let taskPom = taskChange.pom
    if (payload.pomStat === 'add') {
      taskPom++
    } else if (taskPom > 1) {
      taskPom--
    }
    taskChange.pom = taskPom
    // will need to refactor, too much repetition
    const pomTotal = taskChange.pom * 25
    let pomH = Math.floor(pomTotal / 60)
    let pomM
    if (pomH < 1) {
      pomM = pomTotal
      pomH = 0
    }
    pomM = pomTotal - pomH * 60
    taskChange.time = String(pomH).padStart(2, '0') + ':' + String(pomM).padStart(2, '0')
  },
  ADD_TASK (state) {
    if (state.currentTask.value !== '' && state.currentTask.pom !== 0) {
      const addListTask = {}
      state.taskList = [
        ...state.taskList,
        // make new object so tasks are not bound to currentTask
        Object.assign(addListTask, state.currentTask)
      ]
      state.currentTask.id++
      // reset currentTask values
      state.currentTask.value = ''
      state.currentTask.pom = 0
      state.currentTask.time = ''
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
  },
  NEW_TASK (context, value) {
    context.commit('NEW_TASK', value)
  },
  TASK_COUNTER (context, value) {
    context.commit('TASK_COUNTER', value)
    context.commit('TASK_TIME')
  },
  TASK_POM (context, payload) {
    context.commit('TASK_POM', payload)
  },
  ADD_TASK (context) {
    context.commit('ADD_TASK')
  },
  REMOVE_TASK (content, task) {
    content.commit('REMOVE_TASK', task)
  }
}
