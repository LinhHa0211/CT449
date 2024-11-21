<template>
    <div class="list-item">
        <div class="item">
            <div class="item-info">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-attribute">ID: {{ item._id }}</p>
                <p class="item-attribute">Gender: {{ item.gender }}</p>
                <p class="item-attribute">Phone: {{ item.phone }}</p>
                <p class="item-attribute">Email: {{ item.email }}</p>
                <p class="item-attribute">Address: {{ item.address }}</p>
            </div>
            <div class="btn-func">
                <BaseButton nameBtn="Sửa" styleBtn="btn-warning" @click="handleUpdate" class="btn-item"></BaseButton>
                <BaseButton nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete" class="btn-item"></BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
    components: {
        BaseButton,
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['update', 'delete'],
    methods: {
        handleUpdate() {
            this.$emit('update', this.item);
        },
        handleDelete() {
            this.$emit('delete', this.item);
        }
    }
};
</script>

<style scoped>
.list-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 4px;
    margin-bottom: 10px;
    box-shadow: 3px 3px 10px #e0e0e0;
}

.list-item .item {
    display: flex;
    justify-content: space-between;
}

.item .item-name {
    font-size: 20px;
}

.item .item-attribute {
    font-size: 14px;
    margin: 0;
    padding: 0;
}

.btn-func .btn-item {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>