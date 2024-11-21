import createApiClient from "./api.service.js"

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.api = createApiClient(baseUrl)
    }

    async getAllReaders() {
        try {
            const data = (await this.api.get("")).data
            console.log(data)
            return {
                status: "success",
                message: data.message || "Readers retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createReader(reader) {
        try {
            const data = (await this.api.post("", reader)).data
            return {
                status: "success",
                message: data.message || "Reader created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getReaderById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Reader retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateReaderById(id, reader) {
        try {
            const data = (await this.api.put(`/${id}`, reader)).data
            console.log(data)
            return {
                status: "success",
                message: data.message || "Reader updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteReaderById(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Reader deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new ReaderService()