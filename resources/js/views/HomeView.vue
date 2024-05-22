<template>
      <header>
          <RouterLink v-if="!auth.token" class="router-link" to="/login">Login</RouterLink>
          <RouterLink v-if="!auth.token" class="router-link" to="/register">Register</RouterLink>
          <button v-if="auth.token" @click="auth.logout" class="router-link" >Logout</button>
        </header>
    <div class="container">
        <h1>Task managment</h1>
    </div>
    <div class="new-task-form">
        <TaskForm />
    </div>
    <div class="lists">
        <div class="task-list">
            <h2 style="border-bottom: solid 2px plum;">Todo</h2>
            <div v-for="task in tasks"  :key="task.id">
                <TaskDetails v-if="task.stat === 'todo'" :task="task" />
            </div>
        </div>
        <div class="task-list">
            <h2 style="border-bottom: solid 2px orangered;">Inprogress</h2>

            <div v-for="task in tasks" :key="task.id">
                <TaskDetails v-if="task.stat === 'inprogress'" :task="task" />
            </div>
        </div>
        <div class="task-list">
            <h2 style="border-bottom: solid 2px lightgreen;">Completed</h2>
            <div v-for="task in tasks"  :key="task.id">
                <TaskDetails v-if="task.stat === 'completed' " :task="task" />
            </div>
        </div>
    </div>


</template>


<script setup>
    import TaskDetails from "../components/TaskDetails.vue"
    import TaskForm from '../components/TaskForm.vue'

    import { useTaskStore } from '../store/TaskStore'
    import { useAuthStore } from '../store/AuthStore'
    import { useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    const auth = useAuthStore()
    const taskStore = useTaskStore()
    onMounted(()=>{
        auth.user();
        window.Echo.channel("realtime_").listen("TaskUpdated", (event) => {
            taskStore.getTasks();
            console.log(event);
        });
    })
    const { tasks } = storeToRefs(taskStore)

    taskStore.getTasks();
</script>