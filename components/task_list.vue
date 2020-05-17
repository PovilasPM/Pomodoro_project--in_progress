<template>
  <div>
    <hr>
    <form action="">
      <input v-model="inputVal" type="text">
      <div>
        <input class="j-btn-add" type="button" value="+" @click="pomAdding()">
        <input class="j-btn-remove" type="button" value="-" @click="pomRemoving()">
        <p> {{ taskPom }} </p>
      </div>
      <input type="button" value="Add task" @click="addTask()">
    </form>
    <ul>
      <li v-for="task in taskList" :key="task.index">
        <p> {{ task.pom }} </p>
        <p> {{ task.value }} </p>
        <p> {{ task.time }} </p>
        <button @click="addPom(task.id)">+</button>
        <button @click="remPom(task.id)">-</button>
        <button class="remove-task" @click="removeTask(task.id)">
          -
        </button>
      </li>
    </ul>
    <button @click="startTimer()">
      Start working!
    </button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pomAdd: ''
    }
  },
  computed: {
    taskPom () {
      return this.$store.state.currentTask.pom
    },
    inputVal: {
      get () {
        return this.$store.state.currentTask.value
      },
      set (value) {
        this.$store.dispatch('NEW_TASK', value)
      }
    },
    taskList () {
      return this.$store.state.taskList
    }
  },
  methods: {
    pomAdding () {
      this.pomAdd = 'add'
      this.$store.dispatch('TASK_COUNTER', this.pomAdd)
    },
    pomRemoving () {
      this.pomAdd = 'remove'
      this.$store.dispatch('TASK_COUNTER', this.pomAdd)
    },
    addTask () {
      this.$store.dispatch('ADD_TASK')
    },
    startTimer () {
      this.$store.dispatch('START_TIMER')
    },
    removeTask (task) {
      this.$store.dispatch('REMOVE_TASK', task)
    },
  addPom (taskId) {
    this.pomAdd = 'add'
    this.$store.dispatch('TASK_POM', { pomStat: this.pomAdd, task: taskId })
  },
  remPom (taskId) {
    this.pomAdd = 'remove'
    this.$store.dispatch('TASK_POM', { pomStat: this.pomAdd, task: taskId })
  }
  }

}
</script>

<style scoped>
.remove-task {
  background-color: red;
}
</style>
