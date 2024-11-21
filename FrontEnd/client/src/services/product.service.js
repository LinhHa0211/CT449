import createApiClient from "./api.service.js"

class ProductService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl)
    }

    async createProduct(product) {
        try {
            const data = (await this.api.post("", product)).data
            return {
                status: "success",
                message: "Product created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getProducts() {
        try {
            const data = (await this.api.get("")).data
            return {
                status: "success",
                message: "Products retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getProductById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: "Product retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateProduct(id, product) {
        try {
            const data = (await this.api.put(`/${id}`, product)).data
            return {
                status: "success",
                message: "Product updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteProduct(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Product deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new ProductService()