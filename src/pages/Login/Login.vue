<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <v-img src="@/assets/login-svgrepo-com.svg" contain></v-img>
            <p>My Gallery</p>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="login-part d-flex align-center justify-center"
        >
          <v-row no-gutters class="align-start">
            <v-col
              cols="12"
              class="login-part d-flex align-center justify-center flex-column"
            >
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`"> LOGIN </v-tab>
                  <v-tab :href="`#tab-newUser`"> New User </v-tab>

                  <v-tab-item :value="'tab-login'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p
                              class="
                                login-slogan
                                display-2
                                text-center
                                font-weight-medium
                                mt-10
                              "
                            >
                              Hello!
                            </p>
                            <p
                              class="
                                login-slogan
                                display-1
                                text-center
                                font-weight-medium
                                mb-10
                              "
                            >
                              My Gallery
                            </p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <v-text-field
                                v-model="username"
                                type="text"
                                value=""
                                label="Username"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="password"
                                :rules="passRules"
                                type="password"
                                label="Password"
                                hint="At least 6 characters"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                class="text-capitalize"
                                large
                                :disabled="
                                  password.length === 0 || email.length === 0
                                "
                                color="primary"
                                @click="clickLogin()"
                              >
                                Login</v-btn
                              >
                              <v-btn
                                large
                                text
                                class="text-capitalize primary--text"
                                >Forget Password</v-btn
                              >
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p
                              class="
                                login-slogan
                                display-2
                                text-center
                                font-weight-medium
                                mt-10
                              "
                            >
                              Welcome!
                            </p>
                            <p
                              class="
                                login-slogan
                                display-1
                                text-center
                                font-weight-medium
                                mb-10
                              "
                            >
                              Create your account
                            </p>
                          </v-col>

                          <v-form>
                            <v-col>
                              <v-text-field
                                v-model="username"
                                label="Username"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="password"
                                :rules="passRules"
                                type="password"
                                label="Password"
                                hint="At least 6 characters"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="firstName"
                                label="First Name"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="lastName"
                                label="Last Name"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                large
                                block
                                :disabled="
                                  firstName.length === 0 ||
                                  lastName.length === 0 ||
                                  username.length === 0 ||
                                  password.length <= 6
                                "
                                color="primary"
                                @click="newUser()"
                              >
                                Create your account</v-btn
                              >
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "larm@gmail.com",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      createFullName: "John Smith",
      createEmail: "john@flatlogic.com",
      createPassword: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      passRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Min 6 characters",
      ],
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
      signUp: "auth/signUp",
    }),
    clickLogin() {
      this.signIn({ username: this.username, password: this.password }).then(
        () => {
          this.$router
            .replace({
              name: "Dashboard",
            })
            .catch((e) => {
              console.log(e, "errorrrrrrrrrr");
            });
        }
      );
    },

    newUser() {
      const userPayload = {};
      userPayload.username = this.username;
      userPayload.password = this.password;
      userPayload.firstName = this.firstName;
      userPayload.lastName = this.lastName;

      this.signUp(userPayload).then((result) => {
        if (result) {
          window.location.reload();
          this.$router.push("/dashboard");
        }
      });
    },
  },
  created() {
    // if (window.localStorage.getItem("authenticated") === "true") {
    //   this.$router.push("/dashboard");
    // }
  },
};
</script>

<style src="./Login.scss" lang="scss"/>
