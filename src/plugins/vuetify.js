import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        text: colors.grey.darken4,
        primary: colors.blueGrey,
        accent: colors.shades.white,
        card: colors.shades.white,
        // Icon colors
        rating: colors.yellow.darken2,
        hasRestriction: colors.red.lighten4,
        partialRestriction: colors.yellow.accent4,
        noRestriction: colors.lightGreen.darken1,
        saved: colors.red.darken3,
        inactive: colors.grey.lighten3
      }
    }
  }
});
