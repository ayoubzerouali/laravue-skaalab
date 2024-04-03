import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    // const loading = ref(false);
    // state: () => ({
    //     tasks: [],
    // loading: false,
    // }),

    // getters
    const favs = computed(() => {
        return tasks.filter((t) => t.isFav);
    });

    const favCount = computed(() => {
        return tasks.reduce((p, c) => {
            return c.isFav ? p + 1 : p;
        }, 0);
    });

    const totalCount = computed((state) => {
        return state.tasks.length;
    });

    //actions
    async function getTasks() {
        // loading = true;
        try {
            // get data from json file using json server
            const token = "7|bwYZETbSadqFlJvmwYS8BAQpEYgvGZWLpjdzP3xmd76d9ae8";
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
        tasks.value.push(task);

        // const res = await fetch("api/v1/tasks", {
        //     method: "POST",
        //     body: JSON.stringify(task),
        //     headers: {},
        // });

        try {
            // const data = {
            //     name: taskName.value,
            //     text: taskText.value,
            //     stat: "todo",
            //     user_id: 1,
            // };
            const headers = {
                Authorization:
                    "Bearer 7|bwYZETbSadqFlJvmwYS8BAQpEYgvGZWLpjdzP3xmd76d9ae8",
                Accept: "application/json",
                "Content-Type": "application/json",
            };

            const response = await axios.post("/api/v1/tasks", task, {
                headers,
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function deleteTask(id) {
        console.log(id);
        // tasks.value = tasks.value.filter((t) => {
        //     return t.id !== id;
        // });

        // const res = await axios.delete("api/v1/tasks/" + id, {
        //     Authorization:
        //         "Bearer 7|bwYZETbSadqFlJvmwYS8BAQpEYgvGZWLpjdzP3xmd76d9ae8",
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        // });

        // if (res.error) {
        //     console.log(res.error);
        // }
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
    return { deleteTask, toggleFav, addTask, getTasks, tasks };
});
