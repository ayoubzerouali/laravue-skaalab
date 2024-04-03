<template>
  <div class="task">
    <h3 v-if="!isEditing" style="font-size: 16px;" @dblclick="startEditing">{{ task.name }}</h3>
    <input v-else v-model="editedName" @keyup.enter="saveName" @blur="saveName" ref="input" />

    <p v-if="!isEditing" @dblclick="startEditing" style="font-size: 16px;">{{ task.text }}</p>
    <input v-else v-model="editedText" @keyup.enter="saveText" @blur="saveText" ref="input" />
    
    <span style="color: blue;font-size: 11px;">{{  taskStore.userName}}</span>
    <div class="icons">
      <i 
        class="material-icons" 
        style="font-size: 15px;"
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
import { ref,nextTick,onMounted,computed } from 'vue';
import { useTaskStore } from '../store/TaskStore'
const taskStore = useTaskStore()
const props = defineProps(['task']);
const isEditing = ref(false);
const inputRef = ref(null);
const editedName = ref(props.task.name);
const editedText = ref(props.task.text);
const options = ref(['todo','inprogress','completed']);

onMounted( async ()=>{
    await taskStore.getUserName(props.task.user_id)
});

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


<style scoped>
.task{
  height: 10em;
}
</style>