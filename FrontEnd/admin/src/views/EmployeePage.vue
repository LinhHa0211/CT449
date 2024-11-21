<template>
    <div class="container-top">
        <BaseGreeting :title="title"></BaseGreeting>
    </div>
    <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
    <div class="container-employee-item">
        <employee-detail 
            class="employee-detail" 
            v-for="employee in filterEmployees" 
            :item="employee" 
            :key="employee.__uniqueKey || employee._id"
            @update="handleUpdate"
            @delete="handleDelete"
            >
        </employee-detail>
    </div>
</template>

<script>
import BaseGreeting from '@/components/common/BaseGreeting.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import EmployeeDetail from '@/components/employee/EmployeeDetail.vue';
import employeeService from '@/services/employee.service';

export default {
    data() {
        return {
            title: 'Quản lý nhân viên',
            employees: [],
            filterEmployees: [],
            searchBy: "Tìm kiếm theo tên, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        BaseGreeting,
        InputSearch,
        EmployeeDetail,
    },
    beforeMount: async function() {
        await this.getEmployees()
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterEmployees = this.employees;
            else
                this.filterEmployees = this.employees.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterEmployees = this.filterEmployees.map(product => {
                product.__uniqueKey = new Date()
                return product
            })
        },
        async reset() {
            await this.getEmployees()
            this.filter()
        },
        async getEmployees() {
            const res = await employeeService.getAllEmployees();
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.employees = res.data;
                this.filterEmployees = this.employees;
            }
            this.filterEmployees = this.employees;
        },
        addEmployee() {
            this.$router.push({
                name: 'addEmployeePage',
            });
        },
        handleUpdate(employee) {
            this.$router.push({
                name: 'updateEmployeePage',
                params: {
                    id: employee._id,
                },
            });
        },
        async handleDelete(employee) {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
                const resDeleteEmployee = await employeeService.deleteEmployeeById(employee._id)
                if (resDeleteEmployee.status == "error")
                    alert(resDeleteEmployee.message)
                await this.reset()
            }
        },
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.container-employee-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.employee-detail {
    padding: 12px;
}

.input-search {
    margin-bottom: 12px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>