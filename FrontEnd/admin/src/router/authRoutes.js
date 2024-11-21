import Login from "@/views/LoginPage.vue";
import Register from "@/views/RegisterPage.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    }
]

export default routes;