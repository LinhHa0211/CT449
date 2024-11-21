<template>
    <div class="">
        <div class="container-top">
            <BaseGreeting :title="title"></BaseGreeting>
            <BaseButton nameBtn="Sửa" styleBtn="btn-warning" @click="handleEdit"></BaseButton>
        </div>
        <product-detail :product="product"></product-detail>
    </div>
</template>

<script>
import ProductDetail from '@/components/product/ProductDetail.vue';
import productService from '@/services/product.service';
import BaseGreeting from '@/components/common/BaseGreeting.vue';
import BaseButton from '@/components/common/BaseButton.vue';

export default {
    components: {
        BaseGreeting,
        ProductDetail,
        BaseButton,
    },
    created: async function() {
        const res = await productService.getProductById(this.$route.params.id);
        if (res.status == "success")
            this.product = res.data;
        else {
            alert(res.message)
        }
    },
    data() {
        return {
            title: 'Chi tiết sách',
            product: {},
        }
    },
    methods: {
        handleEdit() {
            this.$router.push({
                name: 'updateProductPage',
                params: {
                    id: this.product._id
                },
            });
        },
    },
};
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}
</style>