<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <borow-form @submit="handleSubmit" :borow="borow"></borow-form>
    </div>
</template>

<script>
import TitleForm from "@/components/common/TitleForm.vue";
import BorowForm from "@/components/borow/BorowForm.vue";
import borowService from '@/services/borow.service';

export default {
    components: {
        TitleForm,
        BorowForm,
    },
    data() {
        return {
            title: "Thêm thông tin mượn sách",
        }
    },
    beforeMount: async function() {
        const id = this.$route?.params?.id
        if (id) {
            this.title = "Cập nhật thông tin mượn sách"
            const res = await borowService.getBorowById(id);
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.borow = res.data;
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            let res = null
            if (!this.$route?.params?.id) {
                res = await borowService.createBorow(data);
                alert(res.message)
            } else {
                res = await borowService.updateBorowById(this.$route.params.id, data);
                alert(res.message);
            }
            if (res.status == "success") {
                this.$router.push({
                    name: 'borowPage',
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