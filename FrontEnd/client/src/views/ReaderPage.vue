<template>
    <div class="container-top">
        <BaseGreeting :title="title"></BaseGreeting>
    </div>
    <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
    <div class="container-reader-item">
        <reader-detail 
            class="reader-detail" 
            v-for="reader in filterReaders" 
            :item="reader" 
            :key="reader.__uniqueKey || reader._id"
            @update="handleUpdate"
            @delete="handleDelete"
            >
        </reader-detail>
    </div>
</template>

<script>
import BaseGreeting from '@/components/common/BaseGreeting.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import ReaderDetail from '@/components/reader/ReaderDetail.vue';
import readerService from '@/services/reader.service';

export default {
    data() {
        return {
            title: 'Quản lý độc giả',
            readers: [],
            filterReaders: [],
            searchBy: "Tìm kiếm theo tên, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        BaseGreeting,
        InputSearch,
        ReaderDetail,
    },
    beforeMount: async function() {
        await this.getReaders()
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterReaders = this.readers;
            else
                this.filterReaders = this.readers.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterReaders = this.filterReaders.map(product => {
                product.__uniqueKey = new Date()
                return product
            })
        },
        async reset() {
            await this.getReaders()
            this.filter()
        },
        async getReaders() {
            const res = await readerService.getAllReaders();
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.readers = res.data;
                this.filterReaders = this.readers;
            }
            this.filterReaders = this.readers;
        },
        addReader() {
            this.$router.push({
                name: 'addReaderPage',
            });
        },
        handleUpdate(reader) {
            this.$router.push({
                name: 'updateReaderPage',
                params: {
                    id: reader._id,
                },
            });
        },
        async handleDelete(reader) {
            if (window.confirm("Bạn có chắc chắn muốn xóa độc giả này?")) {
                const resDeleteReader = await readerService.deleteReaderById(reader._id)
                if (resDeleteReader.status == "error")
                    alert(resDeleteReader.message)
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

.container-reader-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.reader-detail {
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