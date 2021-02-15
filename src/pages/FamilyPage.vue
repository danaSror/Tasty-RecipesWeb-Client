<template>
  <div class="background-wrapper" :style="styles">
    <RecipePreviewList
      title="Family recipes"
      :recipes="recipes"
      :isFamilyPage="isFamilyPage"
      class="text-center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import backgroundJpg from "../images/background2.jpeg";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
      isFamilyPage: true,
      background: backgroundJpg,
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.base_url + "/user/familyRecipes"
      );
      const recipesResponse = response.data;
      this.recipes = [];
      this.recipes.push(...recipesResponse);
    } catch (error) {
      console.log(error);
       this.$router.replace("/NotFound");
    }
  },
  computed: {
    styles() {
      return {
        "background-image": `url(${backgroundJpg})`,
        "background-repeat": "repeat",
      };
    },
  },
};
</script>

<style></style>
