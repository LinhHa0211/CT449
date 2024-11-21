<template>
    <form class="form-inline form-search">
        <input class="form-control mr-sm-2 input-search" type="search" :placeholder="searchBy" aria-label="Search" v-model="searchTerm">
        <button class="btn btn-outline-success my-2 my-sm-0" @click="handleSearch">Search</button>
    </form>
</template>

<script>
export default {
    props: {
        searchBy: {
            type: String,
            default: 'Tìm kiếm'
        }
    },
    emits: ['search'],
    data() {
        return {
            searchTerm: ''
        }
    },
    methods: {
        handleSearch(event) {
            event.preventDefault()
            this.$emit('search', this.searchTerm)
        }
    }
}
</script>

<style scoped>
.form-search {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 100px;

}
</style>