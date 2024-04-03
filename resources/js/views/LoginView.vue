<template>
    <RouterLink class="router-link" to="/dashboard">Dashboard</RouterLink>

    <div class="login-container">
        <div class="login-card">
            <h2>{{page.toUpperCase()}}</h2>
            <form @submit.prevent="auth">
             
                <div class="form-group">
                    <label for="email">Email :</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div v-if="page === 'register'" class="form-group">
                    <label for="name">Name :</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <span v-if="authStore.message === 'Unauthorized'">Email ou mot de passe incorrect</span>
                <button class="btn" type="submit">{{page.toUpperCase()}}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

import {ref,onMounted} from 'vue'
import { storeToRefs } from 'pinia'

const email = ref('');
const password = ref('');
const name = ref('');
const page = ref('');
import {useAuthStore} from '../store/AuthStore'
const authStore = useAuthStore();
const { message } = storeToRefs(authStore)

const auth = () => {
    if(page.value === 'login'){
        authStore.login({ email:email.value, password:password.value});

    }else{
        authStore.register({ name:name.value, email:email.value, password:password.value});

    }
}

const router = useRoute();

onMounted(()=>{
    page.value = router.path.slice(1)
})
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>