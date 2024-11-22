<template>
    <title-form :title="titleForm"></title-form>
    <form>
        <div v-if="isRegister" class="form-group">
            <label for="name">Full Name</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="data-of-birth">Date of Birth</label>
            <input type="date" class="form-control" id="data-of-birth" v-model="dateOfBirth">
        </div>

        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" v-model="address">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" v-model="phone">
        </div>

        <div v-if="isRegister" class="submit-form">
            <BaseButton @submit="handleSubmit" :contentComponent="'<p>Submit</p>'" nameBtn="Đăng ký"></BaseButton>
        </div>

        <div v-if="!isRegister" class="submit-form">
            <BaseButton @submit="handleSubmit" :contentComponent="'<p>Submit</p>'" nameBtn="Đăng nhập"></BaseButton>
        </div>
    </form>
</template>

<script>
import TitleForm from "@/components/common/TitleForm.vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default {
    props: {
        isRegister: {
            type: Boolean,
            default: true
        },
        titleForm: {
            type: String,
            default: 'Login'
        }
    },
    emits: ['submit'],
    data() {
        return {
            name: '',
            dateOfBirth: '',
            email: '',
            password: '',
            address: '',
            phone: '',
        }
    },
    components: {
        TitleForm,
        BaseButton,
    },
    methods: {
        getData() {
            if (!this.isRegister) {
                return {
                    email: this.email,
                    password: this.password,
                }
            }
            return {
                name: this.name,
                dateOfBirth: this.dateOfBirth,
                email: this.email,
                password: this.password,
                address: this.address,
                phone: this.phone,
            }
        },
        handleSubmit(event) {
            event.preventDefault();
            this.$emit('submit', this.getData());
        }
    },
};
</script>

<style scoped>
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>