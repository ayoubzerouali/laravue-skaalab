import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/LoginView.vue"),
        },
    ],
});
router.beforeEach((to, from) => {
    const isAuthenticated = localStorage.getItem("token")?.length > 0 ? localStorage.getItem("token") : false ;
    // console.log(isAuthenticated);

    if (
        // make sure the user is authenticated
        isAuthenticated &&
        (to.name == "login" || to.name == "register")
    ) {
        // redirect the user to the login page
        return { name: "Dashboard" };
    }
});
export default router;
