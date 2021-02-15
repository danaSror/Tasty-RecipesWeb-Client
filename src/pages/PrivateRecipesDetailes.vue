<template>
  <div>
       <RecipeView :recipe="choosenRecipe" />
  </div>
</template>

<script>
import RecipeView from "../components/RecipeView";
export default {
  components: {
    RecipeView,
  },
  data() {
    return {
      recipes: [],
      choosenRecipe:{},
    };
  },
  created() {
    this.getPrivateRecipeFromServer();
  },
  methods: {
    async getPrivateRecipeFromServer() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/user/personalRecipes"
        );
        const recipes = response.data;
        console.log(recipes);
        for(let i=0;i<recipes.length;i++){
        
          recipes[i].instructions=JSON.parse(recipes[i].instructions);
          recipes[i].ingredients=JSON.parse(recipes[i].ingredients);
        }
        console.log("recipes");

        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
         for(let i=0;i<this.recipes.length;i++){
              if(this.recipes[i].id ===  this.$route.params.recipeId){
                  this.choosenRecipe=this.recipes[i];
              }
         }
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
      }
    },
  },
};
</script>

<style></style>
