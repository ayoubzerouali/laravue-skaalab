import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./AuthStore";
import { storeToRefs } from "pinia";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);

    const auth = useAuthStore();
    const { isAuthenticated, token, authUser } = storeToRefs(auth);
    const headers = {
        Authorization: `Bearer ${token.value}`,
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
            console.error("Error:", error);
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
    return { deleteTask, addTask, getTasks, tasks, updateTask };
});
