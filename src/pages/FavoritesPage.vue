<template>
  <div class="background-wrapper" :style="styles">
    <RecipePreviewList
      title="My favorite recipes"
      :recipes="recipes"
      :isFavorit="isFavorit"
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
      isFavorit: true,
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.base_url + "/user/getFavorites"
      );
      console.log(response);
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
