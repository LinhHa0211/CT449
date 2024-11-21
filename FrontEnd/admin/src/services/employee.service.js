import createApiClient from "./api.service.js"

class EmployeeService {
    constructor(baseUrl = "/api/employee") {
        this.api = createApiClient(baseUrl)
    }

    async getAllEmployees() {
        try {
            const data = (await this.api.get("")).data
            console.log(data)
            return {
                status: "success",
                message: data.message || "Employees retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createEmployee(employee) {
        try {
            const data = (await this.api.post("", employee)).data
            return {
                status: "success",
                message: data.message || "Employee created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getEmployeeById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Employee retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateEmployeeById(id, employee) {
        try {
            const data = (await this.api.put(`/${id}`, employee)).data
            console.log(data)
            return {
                status: "success",
                message: data.message || "Employee updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteEmployeeById(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Employee deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new EmployeeService()