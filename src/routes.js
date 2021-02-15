import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    // redirect: '/'
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/About",
    name: "AboutPage",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/user/familyRecipes",
    name: "FamilyPage",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/user/familyRecipes/recipesDetailes",
    name: "FamilyRecipesDetailes",
    component: () => import("./pages/FamilyRecipesDetailes"),
  },
  {
    path: "/user/personalRecipes",
    name: "PrivateRecipePage",
    component: () => import("./pages/PrivateRecipePage"),
  },
  {
    path: "/user/personalRecipes/recipesDetailes",
    name: "PrivateRecipesDetailes",
    component: () => import("./pages/PrivateRecipesDetailes"),
  },
  {
    path: "/user/getFavorites",
    name: "FavoritesPage",
    component: () => import("./pages/FavoritesPage"),
  },
];

export default routes;
