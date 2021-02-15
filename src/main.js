import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from "vue-cookies";
import vuetify from "./plugins/vuetify";

axios.defaults.withCredentials = true;

import routes from "./routes";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(VueCookies);

import { BListGroup } from 'bootstrap-vue';
Vue.component('b-list-group', BListGroup);
import { BListGroupItem } from 'bootstrap-vue';
Vue.component('b-list-group-item', BListGroupItem);
import { BAvatar } from 'bootstrap-vue';
Vue.component('b-avatar', BAvatar);

const router = new VueRouter({
  routes,
});



const shared_data = {
    //  base_url: "https://recipe-server-3.herokuapp.com",
  //  base_url: "https://assignment3-2-yarin.herokuapp.com",
  base_url: "http://localhost:3000",
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("query");
    localStorage.removeItem("amount");
    localStorage.removeItem("cuisine");
    localStorage.removeItem("diet");
    localStorage.removeItem("intolerance");
    console.log(Vue.$cookies.keys());
    Vue.$cookies.remove("session");
    this.username = undefined;
  },
};

router.beforeEach((to, from, next) => {
  // if session expired or localStorage was deleted
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }

    // if the route requires Authorization, and user is not authorized, we redirect to login page
    if (to.matched.some((location) => location.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});


import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
//axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// // Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// Vue.prototype.$root.store = shared_data;


new Vue({
  router,
  vuetify,
  data() {
    return {
      store: shared_data,
      
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
   
  },
  render: (h) => h(App),
}).$mount("#app");
