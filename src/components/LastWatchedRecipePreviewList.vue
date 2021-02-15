<template>
  <div class="padding">
    <RecipePreviewList
      title="Last watched recipes"
      :recipes="recipes"
      class="text-center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    // console.log(this.$cookies.get("session"));
    this.updateRecipes();
  },
  methods: {
    getRecipesIds(recipes) {
      var req = "[";
      for (let i = 0; i < recipes.length; i++) {
        const currentRecipe = recipes[i];
        if (i == 0) req = req + currentRecipe.id;
        else req = req + "," + currentRecipe.id;
      }
      req = req + "]";
      return req;
    },
    async updateRecipes() {
      if (this.$root.store.username) {
        try {
          const response = await this.axios.get(
            this.$root.store.base_url + "/user/lastwatchedRecipes"
          );
          const recipes = response.data;
          const indRecipes = await this.axios.get(
            this.$root.store.base_url +
              "/user/recipesInfo/" +
              this.getRecipesIds(recipes)
          );
          const indictionRecipes = indRecipes.data;

          this.recipes = [];
          this.recipes.push(...recipes);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style>
.title {
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: black;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.text-center {
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: black;
}
</style>
