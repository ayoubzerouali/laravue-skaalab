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
  import { useRouter } from "vue-router";

  const taskStore = useTaskStore()
  const auth = useAuthStore()
  const taskName = ref('')
  const taskText = ref('')
  const { isAuthenticated, token, authUser } = storeToRefs(auth);
  const router = useRouter();


  const handleSubmit = async () => {
    if(!isAuthenticated.value){
      // alert('Vous devez être connecté pour ajouter une tâche')
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vous devez etre authentifier!",
        // footer: `<a onclick="redirectToLogin()" href="#" id="login-link">Why do I have this issue?</a>`,
        willClose:()=>{
          router.push({ path: "/login" });
        }
        // footer: '<router-link to="/login">Why do I have this issue?</router-link>'
      });
     
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