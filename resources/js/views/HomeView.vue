<template>
      <header>
          <RouterLink v-if="!auth.token" class="router-link" to="/login">Login</RouterLink>
          <button v-if="!auth.token" class="router-link" to="/register">Register</button>
        </header>
    <div class="container">
        <h1>Task managment</h1>
    </div>
    <div class="new-task-form">
        <TaskForm />
    </div>

    <!-- <nav class="filter">
    <button @click="filter = 'all'">All tasks</button>
    <button @click="filter = 'favs'">Fav tasks</button>
    </nav> -->

    <!-- loading -->
    <!-- <div class="loading" v-if="loading">Loading tasks...</div> -->

    <!-- task list -->
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
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    const auth = useAuthStore()
    const taskStore = useTaskStore()

    const { tasks } = storeToRefs(taskStore)

    taskStore.getTasks()

    


</script>