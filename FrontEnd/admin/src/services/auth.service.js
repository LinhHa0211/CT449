import createApiClient from "./api.service.js"

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl)
    }

    async login(user) {
        try {
            const data = (await this.api.post("login", user)).data
            return {
                status: "success",
                message: data.message || "User logged in successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async register(user) {
        try {
            const data = (await this.api.post("registerAdmin", user)).data
            return {
                status: "success",
                message: data.message || "User registered successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async logout() {
        try {
            const data = (await this.api.post("logout")).data
            return {
                status: "success",
                message: data.message || "User logged out successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new AuthService()