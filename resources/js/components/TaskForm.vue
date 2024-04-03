<template>
  <form @submit.prevent="handleSubmit">
    <input 
      type="text" 
      placeholder="J'ia besoin"
      v-model="taskName"
    >
    <textarea v-model="taskText" cols="30" rows="8" placeholder="Entrez votre text ici"></textarea>
    <button class="btn"  >Add</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  import { useTaskStore } from '../store/TaskStore'
  import { useAuthStore } from '../store/AuthStore'
  const taskStore = useTaskStore()
  const authStore = useAuthStore()
  console.log(authStore.token)
  const taskName = ref('')
  const taskText = ref('')

  const handleSubmit = () => {
    if(!authStore.token){
      alert('Vous devez être connecté pour ajouter une tâche')
      return
    }
    if (taskName.value.length > 0 && taskText.value.length > 0) {
      taskStore.addTask({
        name: taskName.value,
        stat: "todo",
        text:taskText.value,
        user_id:1

      })
      taskName.value = ""
      taskText.value = ""
    }
  }

</script>