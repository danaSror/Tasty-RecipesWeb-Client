<template>
  <div>
      <RecipePreviewList
        title="Explore these recipes"
        :recipes="recipes"
        class="text-center"
      />
      <div class="text-center">
        <button @click="updateRecipes" class="btn" type="button">More</button>
      </div>
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
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/random"
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.btn {
  border: 3px solid #636161;
  border-radius: 6px;
  width: 23%;
  background: #faebd7;
  font-weight: bolder;
}
.btn:hover {
  border-color: gray;
  background: #faebd7;
  box-shadow: 0 0 10px rgbargba(236, 200, 200, 1);
}
.text-center {
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: black;
}

</style>
