<template>
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input type="text" class="form-control" id="address" v-model="address">
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
        publisher: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    data() {
        return {
            name: "Tên nhà xuất bản",
            email: "nhaxuatban@gmail.com",
            address: "Xuan Khanh, Ninh Kieu, Can Tho",
        };
    },
    components: {
        BaseButton,
    },
    watch: {
        publisher(newVal) {
            this.formData(newVal);
        }
    },
    methods: {
        formData(publisher) {
            if (publisher) {
                this.name = publisher.name;
                this.email = publisher.email;
                this.address = publisher.address;
                if (publisher._id) {
                    this._id = publisher._id;
                }
            }
        },
        async handleSubmit(event) {
            event.preventDefault();
            const data = {
                name: this.name,
                email: this.email,
                address: this.address,
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