<template>
  <b-container> 
    <b-row v-for="r in recipes" :key="r.id">
      <b-col >
        <RecipeView :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipeView from "./RecipeView.vue";
export default {
  name: "RecipeViewList",
  components: {
    RecipeView
  },
  props: {
    recipes: {
      type: Array,
      required: true
    },
  },
  
};
</script>

<style scoped>

</style>
