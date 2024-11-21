import createApiClient from "./api.service.js"

class ImageService {
    constructor(baseUrl = "/api/images") {
        this.api = createApiClient(baseUrl)
    }

    async uploadImage(formData) {
        try {
            const data = (await this.api.post("", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })).data
            return {
                status: "success",
                message: data.message || "Image uploaded successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getImageById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Image retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteImage(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Image deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new ImageService()