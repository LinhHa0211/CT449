<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <reader-form @submit="handleSubmit" :reader="reader"></reader-form>
    </div>
</template>

<script>
import TitleForm from "@/components/common/TitleForm.vue";
import ReaderForm from "@/components/reader/ReaderForm.vue";
import readerService from '@/services/reader.service';

export default {
    components: {
        TitleForm,
        ReaderForm,
    },
    data() {
        return {
            title: "Thêm độc giả",
            reader: {
                name: "Tên độc giả",
                email: "docgia@gmail.com",
                address: "Ninh Kieu, Can Tho",
            }
        }
    },
    beforeMount: async function() {
        const id = this.$route?.params?.id
        if (id) {
            this.title = "Cập nhật độc giả"
            const res = await readerService.getReaderById(id);
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.reader = res.data;
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            let res = null
            if (!this.$route?.params?.id) {
                res = await readerService.createReader(data);
                alert(res.message)
            } else {
                res = await readerService.updateReaderById(this.$route.params.id, data);
                alert(res.message);
            }
            if (res.status == "success") {
                this.$router.push({
                    name: 'readerPage',
                });
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