<template>
    <div class="home-page">
        <BaseGreeting :title="tilte"></BaseGreeting>
        <img src="../assets/images/homeImg.jpg" alt="" width="1000px" height="auto">
    </div>
</template>

<script>
import BaseGreeting from "@/components/common/BaseGreeting.vue";
export default {
    data() {
        return {
            tilte: "Chào mừng bạn đến với trang quản lý mượn sách!",
        };
    },
    components: {
        BaseGreeting,
    },
}
</script>

<style scoped>
.title {
    text-align: center;
    color: plum;
}

.home-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
}
</style>