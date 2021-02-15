<template>
  <div>
    <RecipeView
      :recipe="recipe"
      :isViewPage="isViewPage"
      :saved="saved"
      :watched="watched"
    />
  </div>
</template>

<script>
import RecipeView from "../components/RecipeView";
export default {
  data() {
    return {
      recipe: null,
      watched: false,
      saved: false,
      isViewPage: true,
    };
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/getRecipeInformation/" +
            this.$route.params.recipeId
        );
        console.log("recipe response:", response);

        if (response.status !== 200) {
          this.$router.replace("/NotFound");
        } else {
          try {
            if(this.$root.store.username) {

              await this.axios.post(
                this.$root.store.base_url +
                "/user/clicked/" +
                this.$route.params.recipeId
            );
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinute,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings
      } = response.data;

      let _recipe = {
        id,
        instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinute,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings
      };

      this.recipe = _recipe;
      this.saveAndWatch();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async saveAndWatch() {
      try {
        if(this.$root.store.username){

          const response = await this.axios.get(
            this.$root.store.base_url +
            "/user/recipesInfo/" +
            "[" +
            this.recipe.id +
            "]"
        );
        const indictionRecipes = response.data;
        this.saved = indictionRecipes[0][this.recipe.id].saved;
        this.watched = indictionRecipes[0][this.recipe.id].watched;
        }
      } catch (error) {}
    },
  },
  components: {
    RecipeView,
  },
};
</script>

<style scoped>
.btn {
  background-color: #ff69b4; /* Green */
  border: none;
  color: white;
  padding: 10px 10x;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 70%;
}
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
