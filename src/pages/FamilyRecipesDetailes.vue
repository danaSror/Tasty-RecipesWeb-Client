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
    this.getFamilyRecipeFromServer();
  },
  methods: {
    async getFamilyRecipeFromServer() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/user/familyRecipes"
        );
        const recipes = response.data;
    
        for(let i=0;i<recipes.length;i++){
        
          recipes[i].instructions=JSON.parse(recipes[i].instructions);
          recipes[i].ingredients=JSON.parse(recipes[i].ingredients);
        }
        
        this.recipes = [];
        this.recipes.push(...recipes);
                        console.log(this.recipes);

         for(let i=0;i<this.recipes.length;i++){
              if(this.recipes[i].id ===  this.$route.params.recipeId){
                console.log("test family");
                console.log(this.$route.params.recipeId);
                console.log(this.recipes[i].id);
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
