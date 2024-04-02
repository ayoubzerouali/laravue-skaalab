<template>
    <Navbar draggable  />    
    <h2 v-if="books.length > 0" v-for="book in books">
        <h3>{{ book.title }}</h3>
    </h2>
    <h2 v-else>No books found</h2>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios'
import { ref,onMounted, onBeforeMount } from 'vue';

const books = ref([])

onBeforeMount (async ()=>{
    try {
        const response = await axios.get('api/v1/books');
        books.value = response.data.data;
    } catch (error) {
        console.error(error);
    }   
});
</script> 