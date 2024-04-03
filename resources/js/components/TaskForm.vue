<template>
  <form @submit.prevent="handleSubmit">
    <input 
      type="text" 
      placeholder="J'ia besoin"
      v-model="taskName"
    >
    <textarea v-model="taskText" cols="30" rows="8" placeholder="Entrez votre text ici"></textarea>
    <button>Add</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  import { useTaskStore } from '../store/TaskStore'
  const taskStore = useTaskStore()

  const taskName = ref('')
  const taskText = ref('')

  const handleSubmit = () => {
    if (taskName.value.length > 0 && taskText.value.length > 0) {
      taskStore.addTask({
        name: taskName.value,
        stat: "todo",
        text:taskText.value,
        user_id:1
        // id: Math.floor(Math.random() * 1000000)
      })
      taskName.value = ""
      taskText.value = ""
    }
  }

</script>