import { defineStore } from "pinia";
import {ref,computed } from "vue";


export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    const userName = ref("");

    let newToken = ref(localStorage.getItem('token'));
    const isAuthenticated = computed(() => {
        return newToken.value?.length > 1 ;
    });
    const headers = {
        Authorization: `Bearer ${newToken.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    async function addTask(task) {
        try {
            await axios.post("/api/v1/tasks", task, {
                headers,
            });
            tasks.value.push(task);
        } catch (error) {
            console.error("Error:", error.error);
        }
    }
    //actions
    async function getTasks() {
        if (!isAuthenticated.value) {
            Swal.fire({title:"S'authentifier peut etre ??"});
            return 0;
        }
        try {
            const res = await axios.get("api/v1/tasks", {
                headers,
            });
            const data = await res.data;
            tasks.value = data.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function updateTask(id, value, key) {
        const data = { [key]: value };
        const res = await axios.patch("api/v1/tasks/" + id, data, {
            headers,
        });

        if (res.error) {
            console.log(res.error);
        }
    }
    async function deleteTask(id) {
        try {
            const res = await axios.delete("api/v1/tasks/" + id, {
                headers,
            });
            tasks.value = tasks.value.filter((t) => {
                return t.id !== id;
            });
        } catch (error) {
            console.log(res.error);
        }
    }

    async function getUserName(id) {
        const res = await axios.get(`/api/v1/users/${id}`, { headers });
        const data = await res.data;
        userName.value = data.name;
        console.log(data.name);
        return data.name;
    }
    return {
        deleteTask,
        addTask,
        getTasks,
        tasks,
        updateTask,
        getUserName,
        userName,
    };
});
