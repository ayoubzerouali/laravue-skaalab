<template>
  <div class="task">
    <h3>{{ task.name }}</h3>
    <p>{{ task.text }}</p>
    <div class="icons">
      <i 
        class="material-icons" 
        @click="taskStore.deleteTask(task.id)">
        delete
      </i>
      <i 
        class="material-icons"
        :class="{active: task.isFav}" 
        @click="taskStore.toggleFav(task.id)">
        favorite
      </i>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../store/TaskStore'

const taskStore = useTaskStore()
const props = defineProps(['task']);
// console.log(props.task)
</script>