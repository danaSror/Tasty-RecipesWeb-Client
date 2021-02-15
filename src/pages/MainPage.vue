<template>
  <div class="background-wrapper" :style="styles">
    <b-container class="container">
      <b-row>
        <b-col>
          <RandomRecipePreviewList class="RandomRecipes center" />
        </b-col>
        <b-col v-if="!$root.store.username">
          <login-page></login-page>
        </b-col>
        <b-col v-else>
          <LastWatchedRecipePreviewList />
        </b-col>
      </b-row>
    </b-container>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import RandomRecipePreviewList from "../components/RandomRecipePreviewList";
import LoginPage from "../pages/LoginPage";
import LastWatchedRecipePreviewList from "../components/LastWatchedRecipePreviewList";
import backgroundJpg from "../images/background2.jpeg";
export default {
  components: {
    RandomRecipePreviewList,
    LoginPage,
    LastWatchedRecipePreviewList,
  },
  computed: {
    styles() {
      return {
        "background-image": `url(${backgroundJpg})`,
        "background-repeat": "repeat",
        //    "background-repeat": "no-repeat",
        // 'background-size': 'cover'
      };
    },
  },
};
</script>

<style lang="scss">
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
