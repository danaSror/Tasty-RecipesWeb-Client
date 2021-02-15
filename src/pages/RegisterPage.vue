<template>
    <div class="container">
      <h1 class="title text-center">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!-- username -->
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
          class="register-params"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>

          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username alpha
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- first name -->
        <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First name:"
          label-for="firstname"
          class="register-params"
        >
          <b-form-input
            id="firstname"
            v-model="$v.form.$model.firstname"
            type="text"
            :state="validateState('firstname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">
            First name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Last name -->
        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last name:"
          label-for="Last name"
          class="register-params"
        >
          <b-form-input
            id="lastname"
            v-model="$v.form.$model.lastname"
            :state="validateState('lastname')"
            type="text"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">
            Last name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- country -->
        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
          class="register-params"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- passward -->
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
          class="register-params"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>

          <b-form-invalid-feedback v-if="!$v.form.password.length">
            Have length between 5-10 characters long
          </b-form-invalid-feedback>

          <b-form-invalid-feedback v-if="!$v.form.password.digit">
            Have at least one digit
          </b-form-invalid-feedback>

          <b-form-invalid-feedback v-if="!$v.form.password.specialChar">
            Have at least one special char
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- confirm passward -->
        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmation_password"
          class="register-params"
        >
          <b-form-input
            id="confirmation_password"
            type="password"
            v-model="$v.form.confirmation_password.$model"
            :state="validateState('confirmation_password')"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form.confirmation_password.required"
          >
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmation_password.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- E-mail -->
        <b-form-group
          id="email"
          label-cols-sm="3"
          label="Email address:"
          label-for="email"
          class="register-params"
        >
          <b-form-input
            id="email"
            v-model="$v.form.$model.email"
            :state="validateState('email')"
            type="email"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required"
            >E-mail is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- img -->
        <b-form-group
          id="profileurl"
          label-cols-sm="3"
          label="image(URL):"
          label-for="profileurl"
          class="register-params"
        >
          <b-form-input
            id="profileurl"
            v-model="$v.form.$model.profileurl"
            :state="validateState('profileurl')"
            type="text"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.profileurl.required">
            image is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- reset button -->
        <b-button
          type="reset"
          variant="danger"
          style="border: 3px ;border-radius:5px;font-weight: bolder;"
          >Reset</b-button
        >
        <b-button
          type="submit"
          variant="primary"
          style=" background:#2f4f4f; border: 3px ;border-radius:5px;font-weight: bolder;"
          class="ml-5 w-75"
          >Register</b-button
        >
        <div class="mt-2">
          <b> You have an account already?</b>
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  profileurl,
  helpers,
} from "vuelidate/lib/validators";
const digit = helpers.regex("digit", /[0-9]/);
const specialChar = helpers.regex("specialChar", /[!@#$%^&*(),.?":{}|<>]/);
export default { 
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: "",
        password: "",
        confirmation_password: "",
        email: "",
        submitError: undefined,
        profileurl: null,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstname: {
        required,
      },
      lastname: {
        required,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        digit,
        specialChar,
      },
      confirmation_password: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email,
      },
      profileurl: {
        required,
      },
    },
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + "/Register",
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            password: this.form.password,
            confirmation_password: this.form.confirmation_password,
            email: this.form.email,
            profileurl: this.form.profileurl,
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: "",
        password: "",
        confirmation_password: "",
        email: "",
        profileurl: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.register-params {
  color: black;
  font-weight: bolder;
}
.title {
  color: #2f4f4f;
  font-weight: bolder;
}
.title {
  font-weight: bolder;
  color: #2f4f4f;
}
</style>
