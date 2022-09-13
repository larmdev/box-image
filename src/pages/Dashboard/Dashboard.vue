<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">{{ pageTitleName }}</h1>
        <div class="col-md-5">
          <div class="form-group">
            <label for="my-file"
              >เลือกรูภาพที่ต้องการ **สามารถเลือกได้มากกว่า 1 ภาพ**</label
            >
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="previewMultiImage"
              class="choose"
              id="my-file"
            />
          </div>
        </div>
      </v-row>

      <div class="container my-3">
        <div class="row"></div>

        <p v-if="preview_list.length">Preview Here:</p>
        <v-row v-if="preview_list.length" class="bg-preview">
          <v-col
            v-for="(item, index) in preview_list"
            :key="index"
            lg="3"
            sm="6"
            md="5"
            cols="12"
          >
            <img :src="item" class="img-fluid" width="300" />
            <p class="mb-0">file name: {{ image_list[index].name }}</p>
            <p>size: {{ image_list[index].size / 1024 }}KB</p>
          </v-col>
        </v-row>

        <div>
          <div class="w-100"></div>
          <div class="col-12 mt-3 text-center">
            <div>
              <md-button class="btn-upload" 
              v-if="preview_list.length"
              @click="submit()"
                >Upload</md-button
              >
              <md-button
                class="btn-reset"
                v-if="preview_list.length"
                @click="reset"
                >Reset</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <v-row>
        <md-progress-bar md-mode="query"></md-progress-bar>

        <v-col
          v-for="(image, i) in images"
          :key="i"
          lg="3"
          sm="6"
          md="5"
          cols="12"
        >
          <img
            class="image w-100 shadow-1-strong rounded mb-4 image-select"
            :src="image"
            :key="i"
            width="300"
            @click="index = i"
          />
          <vue-gallery-slideshow
            :images="images"
            :index="index"
            @close="index = null"
          >
          </vue-gallery-slideshow>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import VueGallerySlideshow from "vue-gallery-slideshow";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    VueGallerySlideshow,
  },
  data() {
    return {
      pageTitleName: "My Gallery",
      images: [],
      index: null,
      icon: "mdi-arrow-collapse-up",
      text: "Your file is ready to upload",
      iconColor: "primary",
      color: "#e5e9ff",
      multiple: null,
      files: null,
      query: true,
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
    };
  },
  methods: {
    onFileUpload() {
      this.files = this.$refs.file.files[0];
      console.log('this.$refs.file.file', this.$refs.file.files)
    },
    async submit() {
      const formData = new FormData();
      // formData.append("file", this.files);
      formData.append("file", this.image_list[0]);
      let { data } = await axios.post("file/images", formData);
      if (data) {
        this.reset()
      }
      // this.images.push(data.imageUrl);
      this.images.splice(0, 0, data.imageUrl)
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    },
  },

  async mounted() {
    let { data } = await axios.get("file/images");
    data.rows.map((result) => {
      this.images.push(result.imageUrl);
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"/>
