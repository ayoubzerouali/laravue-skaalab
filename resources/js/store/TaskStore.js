import { defineStore } from "pinia";
import { computed, ref, resolveDirective } from "vue";
import { useAuthStore } from "./AuthStore";
import { storeToRefs } from "pinia";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    const userName = ref("");
    const auth = useAuthStore();
    const { isAuthenticated } = storeToRefs(auth);
    let newToken = ref(localStorage.getItem('token'));

    const headers = {
        Authorization: `Bearer ${newToken.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    async function addTask(task) {
        try {
            const response = await axios.post("/api/v1/tasks", task, {
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
        console.log(id);
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
