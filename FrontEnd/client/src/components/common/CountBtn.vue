<template>
    <div class="wrapper-counter">
        <button class="btn btn-outline-secondary" @click="decrementQuantity">
            <i class="fas fa-minus"></i>
        </button>
        <span class="count"> {{ counter }} </span>
        <button class="btn btn-outline-secondary" @click="incrementQuantity">
            <i class="fas fa-plus"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
        }
    },
    emits: ['increment', 'decrement'],
    data() {
        return {
            counter: 0
        }
    },
    created() {
        if (this.count) {
            this.counter = this.count;
        }
    },
    methods: {
        incrementQuantity() {
            this.counter = Math.min(this.counter + 1, 100);
            this.$emit('increment', this.counter);
        },
        decrementQuantity() {
            this.counter = Math.max(this.counter - 1, 1);
            this.$emit('decrement', this.counter);
        }
    }
}
</script>

<style scoped>
.wrapper-counter {
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn {
    display: inline-block;
    font-size: 8px;
}

.count {
    margin: 0 8px;
}
</style>