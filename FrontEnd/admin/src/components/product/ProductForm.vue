<template>
    <form enctype="multipart/form-data">
        <div class="form-group">
            <label for="title">Tên sách</label>
            <input type="text" class="form-control" id="title" v-model="title">
        </div>

        <!-- <div class="form-group">
            <label for="image">Upload Image</label>
            <input type="file" ref="file" @change="onSelect" />
            <div class="message text-danger">
                <p>{{ message }}</p>
            </div>
            <img v-if="imageUrl" :src="imageUrl" alt="" class="image-loaded" />
        </div> -->

        <div class="form-group">
            <label for="availableCopies">Số lượng</label>
            <input type="text" class="form-control" id="availableCopies" v-model="availableCopies">
        </div>

        <div class="form-group">
            <label for="publicationDate">Năm xuất bản</label>
            <input type="text" class="form-control" id="publicationDate" v-model="publicationDate">
        </div>

        <div class="form-group">
            <label for="publisherID">ID nhà xuất bản</label>
            <input type="text" class="form-control" id="publisherID" v-model="publisherID">
        </div>

        <div class="form-group">
            <label for="author">Tên tác giả</label>
            <input type="text" class="form-control" id="author" v-model="author">
        </div>

        <div class="form-group">
            <label for="describe">Mô tả</label>
            <textarea class="form-control" id="describe" v-model="description" style="height: 160px"></textarea>
        </div>

        <div class="submit-form">
            <BaseButton nameBtn="Cập nhật" @submit="handleSubmit"></BaseButton>
        </div>
    </form>
</template>

<script>
import BaseButton from "../common/BaseButton.vue";

export default {
    props: {
        product: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    components: {
        BaseButton,
    },
    watch: {
        product(newVal) {
            this.formData(newVal);
        }
    },
    methods: {
        formData(product) {
            if (product) {
                this.title = product.title;
                this.availableCopies = product.availableCopies;
                this.publicationDate = product.publicationDate;
                this.publisherID = product.publisherID._id;
                this.description = product.description;
                this.author = product.author;
                this.imageUrl = product.imageId.imageUrl;
                this.imageId = product.imageId._id;
                if (product._id)
                    this._id = product._id;
            }
        },
        onSelect() {
            //reset
            this.message = ""
            this.file = null;
            this.imageUrl = "";

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Loại file không đúng, vui lòng tải lại file!";
                return;
            }
            if (file.size > 10000000) {
                this.message = "Kích thước file tối đa 1000kb, vui lòng tải lại file!";
                return;
            }
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.imageUrl = await theReader.result;
            };
            theReader.readAsDataURL(file);
        },
        async handleSubmit(evnet) {
            evnet.preventDefault();
            const data = {
                title: this.title,
                availableCopies: this.availableCopies,
                publicationDate: this.publicationDate,
                publisherID: this.publisherID,
                description: this.description,
                author: this.author,
                image: this.image,
            }
            this.$emit("submit", data);
        },
    },
}

</script>

<style scoped>
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.image-loaded {
    width: 200px;
    height: 200px;
}
</style>