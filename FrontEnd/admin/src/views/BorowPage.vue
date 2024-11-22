Reader<template>
    <div class="container-top">
        <BaseGreeting :title="title"></BaseGreeting>
        <BaseButton class="btn-add-product" nameBtn="Cho mượn sách" @click="addBorow"></BaseButton>
    </div>
    <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
    <div class="container-borow-item">
        <borow-detail 
            class="borow-detail" 
            v-for="borow in filterBorows" 
            :item="borow" 
            :key="borow.__uniqueKey || borow._id"
            @update="handleUpdate"
            @delete="handleDelete"
            >
        </borow-detail>
    </div>
</template>

<script>
import BaseGreeting from '@/components/common/BaseGreeting.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import BorowDetail from '@/components/borow/BorowDetail.vue';
import borowService from '@/services/borow.service';

export default {
    data() {
        return {
            title: 'Quản lý mượn sách',
            borows: [],
            filterBorows: [],
            searchBy: "Tìm kiếm theo tên, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        BaseGreeting,
        BaseButton,
        InputSearch,
        BorowDetail,
    },
    beforeMount: async function() {
        await this.getBorows()
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterBorows = this.borows;
            else
                this.filterBorows = this.borows.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterBorows = this.filterBorows.map(product => {
                product.__uniqueKey = new Date()
                return product
            })
        },
        async reset() {
            await this.getBorows()
            this.filter()
        },
        async getBorows() {
            const res = await borowService.getAllBorows();
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.borows = res.data;
                this.filterBorows = this.borows;
            }
            this.filterBorows = this.borows;
        },
        addBorow() {
            this.$router.push({
                name: 'addBorowPage',
            });
        },
        handleUpdate(borow) {
            this.$router.push({
                name: 'updateBorowPage',
                params: {
                    id: borow._id,
                },
            });
        },
        async handleDelete(borow) {
            if (window.confirm("Bạn có chắc chắn muốn xóa thông tin mượn sách này?")) {
                const resDeleteBorow = await borowService.deleteBorowById(borow._id)
                if (resDeleteBorow.status == "error")
                    alert(resDeleteBorow.message)
                await this.reset()
            }
        },
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.container-borow-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.borow-detail {
    padding: 12px;
}

.input-search {
    margin-bottom: 12px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>