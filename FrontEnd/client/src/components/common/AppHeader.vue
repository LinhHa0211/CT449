<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <nav-item :title="'Trang chủ'" :routerName="'adminPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Sản phẩm'" :routerName="'productPage'" class="navbar-brand"></nav-item>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                aria-expanded="false">
            </button>
            <div class="dropdown-menu">
                <div v-if="role==guestRole" class="dropdown-item login-btn" @click="login">Đăng nhập</div>
                <div v-if="role==guestRole" class="dropdown-item register-btn" @click="register">Đăng ký</div>
                <div v-if="role==userRole" class="dropdown-item logout-btn" @click="logout">Đăng xuất</div>
            </div>
        </div>
    </nav>
</template>

<script>
import NavItem from "@/components/common/NavItem.vue";

export default {
    components: {
        NavItem,
    },
    props: {
        role: {
            type: String,
            default: "guest"
        }
    },
    emits: ['login', 'register', 'logout'],
    data() {
        return {
            guestRole: "guest",
            userRole: "user"            
        }
        
    },
    methods: {
        login() {
            this.$emit('login');
        },
        register() {
            this.$emit('register');       
        },
        logout() {
            this.$emit('logout');
        }
    }
}
</script>

<style scoped>
.dropdown {
    margin-left: auto;
}
.login-btn:hover, .logout-btn:hover {
    cursor: pointer;
}
</style>