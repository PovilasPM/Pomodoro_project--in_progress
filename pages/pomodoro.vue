<template>
  <div>
    <timer />
    <taskList />
  </div>
</template>

<script>
import timer from '~/components/timer.vue'
import taskList from '~/components/task_list.vue'

export default {
  components: {
    timer,
    taskList
  }
}
</script>
