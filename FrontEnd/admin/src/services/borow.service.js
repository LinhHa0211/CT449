import createApiClient from "./api.service.js"

class BorowService {
    constructor(baseUrl = "/api/borow") {
        this.api = createApiClient(baseUrl)
    }

    async getAllBorows() {
        try {
            const data = (await this.api.get("")).data
            console.log(data)
            return {
                status: "success",
                message: data.message || "Borows retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createBorow(borow) {
        try {
            const data = (await this.api.post("", borow)).data
            return {
                status: "success",
                message: data.message || "Borow created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBorowById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Borow retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateBorowById(id, borow) {
        try {
            const data = (await this.api.put(`/${id}`, borow)).data
            return {
                status: "success",
                message: data.message || "Borow updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteBorowById(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Borow deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new BorowService()