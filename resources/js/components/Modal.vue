<template>

    <Dialog v-model:visible="toggle" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">Ajouter une tache</span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="name" class="font-semibold w-6rem">Nom </label>
            <InputText id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="description" class="font-semibold w-6rem">Description</label>
            <InputText id="description" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="$emit('close', false)"></Button>
            <Button type="button" label="Save" @click="$emit('close', false)"></Button>
        </div>
    </Dialog>
</template>

<script setup>

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref,computed } from 'vue';

const props = defineProps({
    toggle:Boolean
});

// const dialogVisible = ref(props.toggle);
const emits = defineEmits(['close']);



const toggle = computed({
    get() {
        return props.toggle;
    },
 
});

</script>
