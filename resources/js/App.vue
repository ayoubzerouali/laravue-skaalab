<template>

    <main>
      <RouterView/>
    </main>
  </template>
  
  <script setup>
  import { onMounted,ref } from 'vue'
  import {useAuthStore} from './store/AuthStore'
  const authStore = useAuthStore();
  const token = ref('');
 
token.value = authStore.refreshToken();
  </script>