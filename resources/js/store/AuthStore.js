import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("authStore", () => {
    const message = ref("");
    const authUser = ref("");
    const router = useRouter();
    let token = ref(localStorage.getItem('token'));

    const isAuthenticated = computed(() => {
        return token.value !== "";
    });
    const headers = {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

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

    async function refreshToken() {
        try {
            const res = await axios.get("/sanctum/csrf-cookie");
            console.log(res);
        } catch (error) {
            console.error(error);
            message.value = error.response.data.message;
        }
    }

    async function user() {
        try {
            const res = await axios.get("/api/v1/user", {
                headers: headers
            });
            authUser.value = res.data;

            return res.data;
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

    return {
        logout,
        register,
        login,
        token,
        user,
        refreshToken,
        isAuthenticated,
        authUser,
        message,
    };
});
