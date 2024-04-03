<template>
  <div class="task">
    <h3 v-if="!isEditing" @dblclick="startEditing">{{ task.name }}</h3>
    <input v-else v-model="editedName" @keyup.enter="saveName" @blur="saveName" ref="input" />

    <p v-if="!isEditing" @dblclick="startEditing">{{ task.text }}</p>
    <input v-else v-model="editedText" @keyup.enter="saveText" @blur="saveText" ref="input" />

    <div class="icons">
      <i 
        class="material-icons" 
        @click="taskStore.deleteTask(task.id)">
        delete
      </i>
      <select @change="changeStat($event)"  name="select" id="select">
        <option v-for="option in options" :value="option" :selected="task.stat === option">{{ option}}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref,nextTick } from 'vue';
import { useTaskStore } from '../store/TaskStore'

const taskStore = useTaskStore()
const props = defineProps(['task']);
const isEditing = ref(false);
const inputRef = ref(null);
const editedName = ref(props.task.name);
const editedText = ref(props.task.text);
const options = ref(['todo','inprogress','completed'])
const startEditing = () => {
  isEditing.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const saveName = () => {
  if (editedName.value.trim() !== '') {
    props.task.name = editedName.value;
    taskStore.updateTask(props.task.id, editedName.value,"name");
  }
  isEditing.value = false;
};

const saveText = () => {
  if (editedName.value.trim() !== '') {
    props.task.text = editedText.value;
    taskStore.updateTask(props.task.id, editedText.value,"text");
  }
  isEditing.value = false;
};


const changeStat = (e) => {
  props.task.stat = e.target.value;
  taskStore.updateTask(props.task.id, e.target.value, "stat");
}
</script>