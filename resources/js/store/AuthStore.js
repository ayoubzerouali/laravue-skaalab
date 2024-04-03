import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("authStore", () => {
    const token = ref(localStorage.getItem("token") || "");
    const message = ref("");
    const router = useRouter();
    async function getToken() {
        const response = await axios.get("/sanctum/csrf-cookie");
        const newToken = response.data.token;
        token.value = newToken;
        localStorage.setItem("token", newToken);
    }

    async function login(credentials) {
        try {
            const res = await axios.post("/api/v1/login", credentials);
            token.value = res.data.token;
            localStorage.setItem("token", token.value);
            router.push({ path: "/dashboard" });
        } catch (error) {
            console.error(error);
            message.value = error.response.data.message;
        }
    }

    async function register(credentials) {
        try {
            const res = await axios.post("/api/v1/register", credentials);
            token.value = res.data.token;
            localStorage.setItem("token", token.value);
            router.push({ path: "/dashboard" });
        } catch (error) {
            console.error(error);
            message.value = error.response.data.message;
        }
    }
    function logout() {
        token.value = "";
        localStorage.removeItem("token");
        router.push({ path: "/login" });
    }
    return { logout, register, login, getToken, token };
});
