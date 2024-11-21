<template>
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Tên nhân viên</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input type="text" class="form-control" id="address" v-model="address">
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="text" class="form-control" id="phone" v-model="phone">
        </div>
        <div class="submit-form">
            <BaseButton nameBtn="Submit" styleBtn="btn-primary" @submit="handleSubmit" class="btn-item"></BaseButton>
        </div>
    </form>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
    props: {
        employee: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    components: {
        BaseButton,
    },
    watch: {
        employee(newVal) {
            this.formData(newVal);
        }
    },
    methods: {
        formData(employee) {
            if (employee) {
                this.name = employee.name;
                this.address = employee.address;
                this.phone = employee.phone;
                if (employee._id) {
                    this._id = employee._id;
                }
            }
        },
        async handleSubmit(event) {
            event.preventDefault();
            const data = {
                name: this.name,
                address: this.address,
                phone: this.phone,
            };
            if (this._id) {
                data._id = this._id;
            }
            this.$emit("submit", data);
        },
    },
}

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