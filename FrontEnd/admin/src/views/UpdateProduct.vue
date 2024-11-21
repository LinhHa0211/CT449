<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <product-form :product="product" @submit="handleSubmit"></product-form>
    </div>
</template>

<script>
import ProductForm from "@/components/product/ProductForm.vue";
import TitleForm from "@/components/common/TitleForm.vue";
import productService from "@/services/product.service";
import imageService from "@/services/image.service"

export default {
    components: {
        ProductForm,
        TitleForm
    },
    data() {
        return {
            title: "Thêm sản phẩm",
            product: null,
        }
    },
    beforeMount: async function() {
        const id = this.$route.params.id
        if (id) {
            this.title = "Cập nhật sản phẩm"
            const res = await productService.getProductById(id)
            if (res.status === "success") {
                this.product = res.data
            } else {
                alert(res.message)
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            const { file, ...productData } = data;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const resImage = await imageService.uploadImage(formData)
                if (resImage.status === "error") {
                    alert(resImage.message)
                    return
                }
                productData.imageId = resImage.data._id
            }

            let resProduct = null
            if (!this.$route.params.id) {
                resProduct = await productService.createProduct(productData)
            } else {
                resProduct = await productService.updateProduct(this.$route.params.id, productData)
            }
            alert(resProduct.message)
            if (resProduct.status == "success") {
                this.$router.push({ name: "productPage" })
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