<template>
  <div>
      <b-card border-variant="dark" :header="recipe.title" align="center" class="mb-3">
    <router-link
      :to="{ name: nameToRoute, params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <b-card
        no-body
       fill-width
       style="width: 20rem;"
        :img-src="recipe.image"
        img-top
        img-alt="Image"
        tag="article"
        class="mb-2"
      >
       <b-list-group align="center">
           <dt> Ready in {{ recipe.readyInMinute }} minutes</dt>
          <dt>  {{ recipe.aggregateLikes }} likes</dt>
       </b-list-group>
       <b-list-group align="center">
        <dt>
            <input
              v-show="recipe.vegetarian"
              type="image"
              style=" margin: 0px 5px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765700/3_ypew1z.jpg"
            />

            <input
              v-show="!recipe.vegetarian"
              type="image"
              style=" margin: 0px 5px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765705/4_fh7sb9.jpg"
            />

            <input
              v-show="recipe.vegan"
              type="image"
              style=" margin: 0px 5px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765713/5_ojj98l.jpg"
            />

            <input
              v-show="!recipe.vegan"
              type="image"
              style=" margin: 0px 5px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765717/6_ybsjgm.jpg"
            />

            <input
              v-show="recipe.glutenFree"
              type="image"
              style=" margin: 0px px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765691/1_j9xlwz.jpg"
            />

            <input
              v-show="!recipe.glutenFree"
              type="image"
              style=" margin: 0px px;"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_65/v1594765695/2_alqduw.jpg"
            />
            </dt>
       </b-list-group>     
      </b-card>
    </router-link>
    <b-card-sub-title v-show="$root.store.username && !isPersonal && !isFamilyPage" >
            <img
              v-show="saved"
              style=" margin: 0px 20px;"
              type="image"
              ref="fileInput"
              v-on:click="addToFavorites"
              
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594764058/newSave2_jkw4ru.jpg"
            />
            <img v-show="!saved" 
            src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594764053/newSave1_jtnhik.jpg" 
            v-on:click="addToFavorites"
            style=" margin: 0px 20px;"
            
             />
            <img
              v-show="!watched"
              type="image"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594762079/notwatch_u948bi.jpg"
            />
            <img
              v-show="watched"
              type="image"
              src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594762074/watch_akr3xh.jpg"
            />
    </b-card-sub-title>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameToRoute: "recipe",
      watched: false,
      saved: false,
    };
  },
  created() {
    if (!this.isPersonal && !this.isFamilyPage && this.$root.store.username)
      this.saveAndWatch();
    if (this.isPersonal) this.nameToRoute = "PrivateRecipesDetailes";
    if (this.isFamilyPage) this.nameToRoute = "FamilyRecipesDetailes";
  },
  methods: {
    async addToFavorites() {
      try {
        let response = await this.axios.post(
          this.$root.store.base_url + "/user/addFavorite/" + this.recipe.id
        );

        this.saved = true;
      } catch (error) {
        console.log(error);
      }
    },
    async saveAndWatch() {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    isPersonal: {
      type: Boolean,
      required: true,
    },
    isFavorit: {
      type: Boolean,
      required: true,
    },
    isFamilyPage: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  position: relative;
  margin: 10px 10px;
}
.mb-2 {
  max-width: 22rem;
  max-height: 35rem;

}
.mb-3 {
  min-width: 20rem;
  max-height: 40rem;
}


</style>
