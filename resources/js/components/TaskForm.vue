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
  import { storeToRefs } from "pinia";

  const taskStore = useTaskStore()
  const auth = useAuthStore()
  const taskName = ref('')
  const taskText = ref('')
  const { isAuthenticated, token, authUser } = storeToRefs(auth);


  const handleSubmit = async () => {
    if(!isAuthenticated.value){
      alert('Vous devez être connecté pour ajouter une tâche')
      return
    }
    if (taskName.value.length > 0 && taskText.value.length > 0) {
      const userAuth = await auth.user()
      taskStore.addTask({
        name: taskName.value,
        stat: "todo",
        text:taskText.value,
        user_id: userAuth.id
      })
      taskName.value = ""
      taskText.value = ""
    }
  }

</script>