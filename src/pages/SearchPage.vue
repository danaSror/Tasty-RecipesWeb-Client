<template>
  <div class="background-wrapper" :style="styles">
    <div class="container">
      <br /><br />
      <h1 class="title">Search for recipes</h1>
      <br />
      <!--------------- Search section ---------------->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            style="width: 350px"
            placeholder="What kind of recipe would you like to search?"
            v-model="params.query"
            v-on:keyup.enter="searchRecipe"
          >
          </b-form-input>

          <b-form-select style="margin: 0px 15px" v-model="params.amount">
            <option disabled value="">Number of recipes</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </b-form-select>

          <b-form-select
            :options="CuisinesFilter"
            style="width: 120px;margin: 0px 0px"
            v-model="params.cuisine"
          >
            <option disabled value="">Cuisines</option>
          </b-form-select>

          <b-form-select
            :options="DietsFilter"
            style="width: 120px;margin: 0px 0px"
            v-model="params.diet"
          >
            <option disabled value="">Diets</option>
          </b-form-select>
          <b-form-select
            :options="IntolerancesFilter"
            style="width: 135px; margin: 0px 0px"
            v-model="params.intolerance"
          >
            <option disabled value="">Intolerances</option>
          </b-form-select>
          <!-- ******* -->
        </b-nav-form>
      </b-navbar-nav>
      <br />
      <br />
      <b-button
        v-if="!this.params.query"
        disabled
        @click="searchRecipe"
        type="submit"
      >
        <b>Search</b>
      </b-button>

      <b-button v-else @click="searchRecipe" type="submit">
        <b>Search</b>
      </b-button>

      <b-button
        @click="clearSearchParamsForUser"
        type="submit"
        style=" margin: 0px 25px;"
      >
        <b>Clear fields</b>
      </b-button>

      <!-- show background -->
      <div v-show="!showResult">
        <RecipePreviewList title="" :recipes="null" />
      </div>
      <!--------------- Result section ---------------->
      <div v-show="showResult && recipes.length > 0">
        <br />
        <br />
        <b-nav-form class="title text-center"
          ><b>Sort results by</b> :
          <input
            type="checkbox"
            value="Preparation time"
            v-model="preparationFilter"
            @click="sortedArrayByPreparationTime"
            style="margin: 0px 15px"
            :disabled="likesFilter"
          />
          <label for="preparation time"><b>Preparation time</b></label>
          <input
            type="checkbox"
            value="Likes"
            v-model="likesFilter"
            @click="sortedArrayByLikes"
            style="margin: 0px 10px"
            :disabled="preparationFilter"
          />
          <label for="Likes"><b>Likes</b></label>
        </b-nav-form>
        <br />
        <h2 class="recipesResut-title">Recipes results</h2>
        <RecipePreviewList title="" :recipes="recipes" />
      </div>
      <div v-if="ShowBackground" v-show="resultCount == 0" class="titleText" >
        <br /><br /><br />
        <h3>No suitable results</h3>
        <RecipePreviewList title="" :recipes="null" />
      </div>
    </div>
    <br><br><br> <br><br><br> <br><br><br> <br><br><br> <br><br><br> <br><br><br> <br><br><br> 
  </div>
</template>

<script src="https://unpkg.com/vue@latest"></script>
<script src="https://unpkg.com/vue-select@latest"></script>
<script>
import CuisinesFilter from "../assets/CuisinesFilter";
import DietsFilter from "../assets/DietsFilter";
import IntolerancesFilter from "../assets/IntolerancesFilter";
import RecipePreviewList from "../components/RecipePreviewList";
import backgroundJpg from "../images/background2.jpeg";
export default {
  name: "SearchBar",
  data() {
    return {
      recipes: [],
      params: {
        query: "",
        amount: "",
        cuisine: "",
        diet: "",
        intolerance: "",
      },
      CuisinesFilter: [{ value: null, text: "", disabled: true }],
      DietsFilter: [{ value: null, text: "", disabled: true }],
      IntolerancesFilter: [{ value: null, text: "", disabled: true }],
      showResult: false,
      likesFilter: false,
      preparationFilter: false,
      resultCount: -1,
      ShowBackground: true,
    };
  },
  computed: {
    styles() {
      return {
        "background-image": `url(${backgroundJpg})`,
        "background-repeat": "repeat",
        // "background-repeat": "no-repeat",
        // 'background-size': 'cover'
      };
    },
  },
  created() {
    if (localStorage.query && this.$root.store.username) {
      if (localStorage.query) this.params.query = localStorage.query;
      if (localStorage.amount) this.params.amount = localStorage.amount;
      if (localStorage.cuisine) this.params.cuisine = localStorage.cuisine;
      if (localStorage.diet) this.params.diet = localStorage.diet;
      if (localStorage.intolerance)
        this.params.intolerance = localStorage.intolerance;

      this.getRecipeFromServer();
      this.showResult = true;
    }
  },
  mounted() {
    this.CuisinesFilter.push(...CuisinesFilter);
    this.DietsFilter.push(...DietsFilter);
    this.IntolerancesFilter.push(...IntolerancesFilter);
  },
  methods: {
    clearSearchParamsForUser() {
      this.params.query = "";
      this.params.amount = "";
      this.params.cuisine = "";
      this.params.diet = "";
      this.params.intolerance = "";
    },
    async getRecipeFromServer() {
      try {
        console.log("getRecipeFromServer");
        if (!this.params.amount && this.params.query) {
          this.params.amount = 5;
        }
        const response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/search/query/" +
            this.params.query +
            "/amount/" +
            this.params.amount +
            "?cuisine=" +
            this.params.cuisine +
            "&diet=" +
            this.params.diet +
            "&intolerances=" +
            this.params.intolerance
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        this.resultCount = this.recipes.length;
      } catch (err) {
        console.log(err.response);
      }
    },
    searchRecipe() {
      this.getRecipeFromServer();
      this.showResult = true;
      if (this.$root.store.username) {
        localStorage.setItem("query", this.params.query);
        localStorage.setItem("amount", this.params.amount);
        localStorage.setItem("cuisine", this.params.cuisine);
        localStorage.setItem("diet", this.params.diet);
        localStorage.setItem("intolerance", this.params.intolerance);
        console.log(localStorage.query);
      }
    },  
    sortedArrayByLikes() {
      // sort the recipes frome top likes to down
      function compareLikes(a, b) {
        if (a.aggregateLikes < b.aggregateLikes) return 1;
        if (a.aggregateLikes > b.aggregateLikes) return -1;
        return 0;
      }

      const sortedRecipes = this.recipes.sort(compareLikes);
      this.recipes = [];
      this.recipes.push(...sortedRecipes);
      //return this.recipes.sort(compareLikes);
    },
    sortedArrayByPreparationTime() {
      // sort the recipes and showe in the top the smallest preparation time
      function comparePreparationTime(a, b) {
        if (a.readyInMinute < b.readyInMinute) return -1;
        if (a.readyInMinute > b.readyInMinute) return 1;
        return 0;
      }
      //return this.recipes.sort(comparePreparationTime);
      const sortedRecipes = this.recipes.sort(comparePreparationTime);
      this.recipes = [];
      this.recipes.push(...sortedRecipes);
    },
    sortedArray() {
      if (this.likesFilter) sortedArrayByLikes();
      if (this.preparationFilter) sortedArrayByPreparationTime();
    },
 
  },

  components: {
    RecipePreviewList,
  },
};
</script>

<style scoped>
.title {
  color: #faebd7;
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
}
.recipesResut-title{
  text-align:center;
  color: #2f4f4f;
  font-weight: bolder;
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.titleText {
  color: black;
  font-weight: bolder;
  text-align: center;
  font-weight: bolder;
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.btn {
  background: teal;
  width: 12%;
}
.btn:hover {
  background: teal;
  box-shadow: 0 0 10px rgbargba(236, 200, 200, 1);
}
</style>
