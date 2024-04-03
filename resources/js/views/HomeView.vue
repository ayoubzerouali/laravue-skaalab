<template>
    <Section />

    <Modal :visible="displayModal" @close-modal="closeModal"/>

</template>


<script setup>
import Section from '../components/Section.vue';
import Modal from '../components/Modal.vue';
import { ref } from 'vue';
const displayModal = ref(false);
    
const openModal = () => {
    displayModal.value = true;
};

const closeModal = () => {
    displayModal.value = false;
};

</script>