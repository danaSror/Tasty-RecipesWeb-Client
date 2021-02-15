<template>
  <div class="container">
    <br /><br /><br /><br />
    <h1 class="title text-center">Login</h1>
    <br />
    <b-form @submit.prevent="onLogin" class="form-inline">
      <b-form-group
        class="login-params"
        id="input-group-Username"
        label-cols-sm="4"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        class="login-params"
        id="input-group-Password"
        label-cols-sm="4"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block; background:#2f4f4f; border: 3px solid #faebd7;border-radius: 6px;font-weight: bolder;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
          <b> Do not have an account yet? </b>
          <router-link to="register"> Register in here</router-link>      
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + "/Login",
          {
            username: this.form.username,
            password: this.form.password,
            withCredentials: true,
          }
        );
        console.log("test", this.$cookies.get("session"));
        this.$root.store.login(this.form.username);
        console.log(this.$root.store.login);

        this.$router.push("/").catch(() => {});
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");
      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
.title {
  font-weight: bolder;
  color: #2f4f4f;
}

.login-params {
  color: black;
  font-weight: bolder;
}

</style>