<template>
    <footer class="app-footer">
        <p>&copy; {{ currentYear }} Quản lý mượn sách</p>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
};
</script>

<style scoped>
.app-footer {
    background-color: #343a40;
    color: white;
    padding: 12px 0;
    text-align: center;
}

p {
    margin: 0;
}
</style>