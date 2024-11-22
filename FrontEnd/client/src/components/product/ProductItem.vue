<template>
    <tr>
        <td>
            <div class="product">
                <img :src="product.image" alt="Hình Ảnh" width="100" height="100" class="product-img"/>
            </div>
        </td>
        <td>
            {{ product.title }}
        </td>
        <td>
            {{ product.availableCopies }}
        </td>
        <td>
            {{ product.publicationDate }}
        </td>
        <td>
            {{ product.publisherID }}
        </td>
        <td>
            {{ product.author }}
        </td>
        <td>
            <BaseButton nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-func"></BaseButton>
            <BaseButton nameBtn="Đăng ký mượn sách" styleBtn="btn-danger" class="btn-func"></BaseButton>
        </td>
    </tr>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue"

export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ['deleteProduct', 'showDetail'],
    components: {
        BaseButton,
    },
    methods: {
        shortForm(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        handleDelete() {
            this.$emit('deleteProduct', this.product);
        },
        handleShowDetail() {
            this.$emit('showDetail', this.product);
        }
    }
};
</script>

<style scoped>
.product {
    display: flex;
}

.product .product-name {
    margin-left: 10px;
    padding: 0;
    font-size: 14px;
}

.product .product-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

.btn-func {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>