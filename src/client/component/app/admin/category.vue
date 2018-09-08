<template>
  <form @submit.prevent="submit(category)">
    <div class="form-group">
      <input type="text" v-model="category.title" placeholder="title" class="form-control"/>
    </div>
    <div class="form-group">
      <textarea v-model="category.description" placeholder="description" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <app-category-tree v-model="category.parent_id"></app-category-tree>
    </div>
    <div class="form-group">
      <input type="submit" class="btn btn-primary"/>
    </div>
  </form>
</template>
<script>
  import category from '../../../api/category';
  import AppCategoryTree from './category-tree.vue';
  import SimpleMDE from 'simplemde';
  import 'simplemde/dist/simplemde.min.css';

  let isNew = true

  export default {
    props: {
      id: {
        type: Number,
        default: 0
      },
      parentId: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      console.log(this.parentId)
      return {
        category: {parent_id: this.parentId},
      }
    },
    methods: {
      submit: function (data) {
        var method = isNew ? 'save' : 'update'
        category[method](data.id, data).then(res => console.log(res))
      },
      setForm: function () {
        // get category info if not new
        var id = this.id || this.$route.params.id;
        if (id) {
          category.get(id)
            .then(
              res => {
                this.category = res.data
                isNew = false
              }
            )
        } else {
          isNew = true
          this.category = {
            parent_id: this.parentId
          }
        }
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    watch: {
      id: {
        handler: function () {
          this.setForm()
        },
        immediate: true
      },
      parentId: {
        handler: function () {
          this.setForm()
        }
      }
    },
    components: {
      AppCategoryTree
    }
  }
</script>
<style lang="scss">
    @import "test.scss";
  body {
      transition: all .2s;
      display: flex;
  }
</style>
