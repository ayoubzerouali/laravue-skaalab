<template>
    <div>
        <Navbar @toggle-modal="toggleModal"/>
        <Section />
        <Modal :toggle="visible" @close="(value) => visible = value"/>
    </div>
</template>

<script setup>
import Section from './components/Section.vue';
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import { ref } from 'vue';

const visible = ref(false);

function toggleModal(params) {
    visible.value = params
}
</script> 
