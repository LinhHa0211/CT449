<template>
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="readerID">ID độc giả</label>
            <input type="text" class="form-control" id="readerID" v-model="readerID">
        </div>

        <div class="form-group">
            <label for="bookID">ID sách</label>
            <input type="text" class="form-control" id="bookID" v-model="bookID">
        </div>

        <div class="form-group">
            <label for="employeeID">Id nhân viên</label>
            <input type="text" class="form-control" id="employeeID" v-model="employeeID">
        </div>
        <div class="form-group">
            <label for="returnedDate">Ngày trả sách</label>
            <input type="date" class="form-control" id="returnedDate" v-model="returnedDate">
        </div>
        <div class="submit-form">
            <BaseButton nameBtn="Cập nhật" styleBtn="btn-primary" @submit="handleSubmit" class="btn-item"></BaseButton>
        </div>
    </form>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
    props: {
        borow: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    components: {
        BaseButton,
    },
    watch: {
        borow(newVal) {
            this.formData(newVal);
        }
    },
    methods: {
        formData(borow) {
            if (borow) {
                this.readerID = borow.readerID;
                this.bookID = borow.bookID;
                this.employeeID = borow.employeeID;
                this.returnedDate = borow.returnedDate;
                if (borow._id) {
                    this._id = borow._id;
                }
            }
        },
        async handleSubmit(event) {
            event.preventDefault();
            const data = {
                readerID: this.readerID,
                bookID: this.bookID,
                employeeID: this.employeeID,
                returnedDate: this.returnedDate,
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