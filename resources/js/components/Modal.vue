<template>

    <Dialog :visible="visible" modal   header="Ajouter une tache" :style="{ width: '25rem' }">
        <div class="flex align-items-center gap-3 mb-3">
            <label for="name" class="font-semibold w-6rem">Nom </label>
            <InputText v-model="taskName" id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="description" class="font-semibold w-6rem">Description</label>
            <InputText v-model="taskText" id="description" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="closeModal()"></Button>
            <Button type="button" label="Save" @click="addTask()"></Button>
        </div>
    </Dialog>
</template>

<script setup>

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref,computed,defineEmits  } from 'vue';
import axios from 'axios';

const taskName = ref('');
const taskText= ref('');

const emit = defineEmits(["closeModal",'taskAdded']);
    
    defineProps({
      visible: {
      type: Boolean,
      },
    });

    const closeModal = () => {
      emit("closeModal");
    };
    const addTask = async () => {
        try {
            const data = {
                name: taskName.value,
                text: taskText.value,
                stat:"todo",
                user_id:1
            };
            const headers = {
                'Authorization': 'Bearer 7|bwYZETbSadqFlJvmwYS8BAQpEYgvGZWLpjdzP3xmd76d9ae8',
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            };

            const response = await axios.post('/api/v1/tasks', data,{headers});
            emits.taskAdded(response.data)
            closeModal();
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>
