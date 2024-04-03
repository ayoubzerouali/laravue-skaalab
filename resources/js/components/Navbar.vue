<template>
    <TabMenu class="tabmenu" :model="items"></TabMenu>
    <div class="tabmenu-container">
        <Button @click="$emit('toggleModal',true)" label="Ajouter" icon="pi pi-plus"/>
    </div>
</template>

<script setup>
import TabMenu from 'primevue/tabmenu'
import Button from 'primevue/button'
import { defineEmits } from 'vue';
const items = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home'
    },
]

const emits = defineEmits(["toggleModal"]);

</script>

<style scoped>
.tabmenu-container {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 1rem;
}
</style>