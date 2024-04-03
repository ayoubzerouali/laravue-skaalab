import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./AuthStore";
export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    const token = localStorage.getItem("token");

    const auth = useAuthStore();

    // getters

    //actions
    async function getTasks() {
        // loading = true;
        if (!auth.token) {
            return 0;
        }
        try {
            const res = await axios.get("api/v1/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await res.data;
            console.log(data.data);
            tasks.value = data.data;
        } catch (error) {
            console.error("Error:", error);
        }
        // console.log(tasks.value.data);
        // loading = false;
    }
    async function addTask(task) {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            };

            const response = await axios.post("/api/v1/tasks", task, {
                headers,
            });
            tasks.value.push(task);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function updateTask(id, value, key) {
        const data = { [key]: value };
        const res = await axios.patch("api/v1/tasks/" + id, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (res.error) {
            console.log(res.error);
        }
    }

    async function deleteTask(id) {
        console.log(id);
        try {
            const res = await axios.delete("api/v1/tasks/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            tasks.value = tasks.value.filter((t) => {
                return t.id !== id;
            });
        } catch (error) {
            console.log(res.error);
        }
    }
    async function toggleFav(id) {
        const task = tasks.find((t) => t.id === id);
        task.isFav = !task.isFav;

        const res = await fetch("http://localhost:3000/tasks/" + id, {
            method: "PATCH",
            body: JSON.stringify({ isFav: task.isFav }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.error) {
            console.log(res.error);
        }
    }
    return { deleteTask, toggleFav, addTask, getTasks, tasks, updateTask };
});
