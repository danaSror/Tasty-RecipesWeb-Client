<template>
  <b-container>
    <h2 class="title text-center">{{ title }}</h2>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :isPersonal="isPersonal"
          :isFavorit="isFavorit"
          :isFamilyPage="isFamilyPage"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: false,
    },
    isPersonal: {
      type: Boolean,
      required: false,
    },
    isFavorit: {
      type: Boolean,
      required: false,
    },
    isFamilyPage:{
       type: Boolean,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.title{
   font-family: "Comic Sans MS", cursive, sans-serif;
  // color:black;
   color:#faebd7; 
   text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
}

</style>
