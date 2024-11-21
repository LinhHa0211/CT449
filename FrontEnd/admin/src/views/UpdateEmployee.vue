<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <employee-form @submit="handleSubmit" :employee="employee"></employee-form>
    </div>
</template>

<script>
import TitleForm from "@/components/common/TitleForm.vue";
import EmployeeForm from "@/components/employee/EmployeeForm.vue";
import employeeService from '@/services/employee.service';

export default {
    components: {
        TitleForm,
        EmployeeForm,
    },
    data() {
        return {
            title: "Thêm nhân viên",
            employee: {
                name: "Tên nhà xuất bản",
                email: "nhaxuatban@gmail.com",
                address: "Xuan Khanh, Ninh Kieu, Can Tho",
            }
        }
    },
    beforeMount: async function() {
        const id = this.$route?.params?.id
        if (id) {
            this.title = "Cập nhật nhân viên"
            const res = await employeeService.getEmployeeById(id);
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.employee = res.data;
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            let res = null
            if (!this.$route?.params?.id) {
                res = await employeeService.createEmployee(data);
                alert(res.message)
            } else {
                res = await employeeService.updateEmployeeById(this.$route.params.id, data);
                alert(res.message);
            }
            if (res.status == "success") {
                this.$router.push({
                    name: 'employeePage',
                });
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>