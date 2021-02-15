<template>
  <b-container v-if="recipe">
    <div>
      <b-card-group deck>
        <b-card
          style="margin: 0px 50px;"
          
        >
          <!-- ************ -->
          <template v-slot:header>
            <h4 class="mb-0">{{ recipe.title }}</h4>
          </template>
          <b-row>
            <b-col>
              <!-- left -->
              <b-card
                no-body
                style="max-width: 30rem;"
                :img-src="recipe.image"
                img-alt="Image"
                img-top
              >
                <!-- <template v-slot:header v-show="isFamilyPage">
                
                </template> -->

                <b-list-group align="center" v-show="recipe.recipeOwner">
                  Recipe owner : {{ recipe.recipeOwner }}
                </b-list-group>
                <b-list-group align="center" v-show="recipe.recipeOwner">
                  Traditional preparation time :
                  {{ recipe.traditionalPreparationTime }}
                </b-list-group>
                <b-list-group align="center">
                  likes : {{ recipe.aggregateLikes }}
                </b-list-group>
                <b-list-group align="center">
                  Preparation time : {{ recipe.readyInMinute }} minutes
                </b-list-group>
                <b-list-group align="center">
                  Servings : {{ recipe.servings }}
                </b-list-group>

                <b-list-group align="center">
                  <b-list-group-item>
                    <input
                      v-show="recipe.vegetarian"
                      type="image"
                      style=" margin: 0px 5px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765700/3_ypew1z.jpg"/>

                    <input
                      v-show="!recipe.vegetarian"
                      type="image"
                      style=" margin: 0px 5px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765705/4_fh7sb9.jpg"/>

                    <input
                      v-show="recipe.vegan"
                      type="image"
                      style=" margin: 0px 5px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765713/5_ojj98l.jpg"/>

                    <input
                      v-show="!recipe.vegan"
                      type="image"
                      style=" margin: 0px 5px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765717/6_ybsjgm.jpg"/>

                    <input
                      v-show="recipe.glutenFree"
                      type="image"
                      style=" margin: 0px px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765691/1_j9xlwz.jpg"/>

                    <input
                      v-show="!recipe.glutenFree"
                      type="image"
                      style=" margin: 0px px;"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_75/v1594765695/2_alqduw.jpg"
                  /></b-list-group-item>
                </b-list-group>

                <b-list-group align="center">
                  <b-list-group-item
                    v-show="$root.store.username && isViewPage"
                  >
                    <img
                      v-show="saved"
                      style=" margin: 0px 20px;"
                      type="image"
                      ref="fileInput"
                      v-on:click="addToFavorites"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594764058/newSave2_jkw4ru.jpg"/>

                    <img
                      v-show="!saved"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594764053/newSave1_jtnhik.jpg"
                      v-on:click="addToFavorites"
                      style=" margin: 0px 20px;"/>
                    <img
                      v-show="!watched"
                      type="image"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594762079/notwatch_u948bi.jpg"/>
                    <img
                      v-show="watched"
                      type="image"
                      src="https://res.cloudinary.com/dfgjujaok/image/upload/c_scale,h_45/v1594762074/watch_akr3xh.jpg"
                  /></b-list-group-item>
                </b-list-group>
              </b-card>
            </b-col>
            <!-- **************right********** -->
            <b-col>
              <!-- right -->
              <b><u>Ingredients:</u></b>
              <br />
              <ul v-show="!isViewPage">
                <li
                  v-for="(r, index) in recipe.ingredients"
                  :key="index + '_' + r.id"
                >
                  {{ recipe.ingredients[index] }}
                </li>
              </ul>
              <ul v-show="isViewPage">
                <li
                  v-for="(r, index) in recipe.extendedIngredients"
                  :key="index + '_' + r.id"
                >
                  {{ recipe.extendedIngredients[index] }}
                </li>
              </ul>
              <br /><br />
              <b><u>Instructions:</u></b>
              <br />
              <ol v-show="recipe.instructions">
                <li
                  v-for="(r, index) in recipe.instructions"
                  :key="index + '_' + r.id"
                >
                  {{ recipe.instructions[index] }}
                </li>
              </ol>
              <div
                v-show="
                  !recipe.instructions || recipe.instructions.length === 0
                "
              >
                Mix all the ingredients together
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async addToFavorites() {
      try {
        console.log(this.recipe.id);
        let response = await this.axios.post(
          this.$root.store.base_url + "/user/addFavorite/" + this.recipe.id
        );

        this.saved = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: false,
    },
    isViewPage: {
      type: Boolean,
      required: false,
    },
    isFamilyPage: {
      type: Boolean,
      required: false,
    },
    saved: {
      type: Boolean,
      required: false,
    },
    watched: {
      type: Boolean,
      required: false,
    },
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
.b {
  background-color: #ffffff;
}
</style>
