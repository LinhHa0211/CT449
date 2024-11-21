<template>
    <div class="container">
        <login :isRegister="isRegister" :titleForm="titleForm" @submit="handleSubmit"></login>
    </div>
</template>

<script>
import Login from "@/components/auth/AuthPage.vue";
import authService from "@/services/auth.service";
// import { mapStores } from 'pinia'
// import useAuthStore from "@/stores/auth.store"
// import employeeService from "@/services/employee.service"

export default {
    data() {
        return {
            isRegister: true,
            titleForm: 'Đăng ký',
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            const res = await authService.register(data);
            if (res.status == "success") {
                // const responseGetEmployee = await employeeService.getEmployeeById(res.data._id)
                // if (responseGetEmployee.status == "error") {
                //     alert(responseGetEmployee.message)
                //     return
                // }
                // this.authStore.setUser(responseGetEmployee.data)
                // this.authStore.setRole(res.data.role)
                // localStorage.setItem("role", res.data.role)
                // localStorage.setItem("user", JSON.stringify(responseGetEmployee.data))
                alert(res.message)
                // this.$emit('login')
                this.$router.push({ name: "login"})
            } else {
                alert(res.message)
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>