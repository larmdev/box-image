<template>
  <v-app-bar class="main-header" height="64" fixed color="primary" dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon style="font-size: 28px">mdi-chevron-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-toolbar-title>My GAllery</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-0" icon v-bind="attrs" v-on="on" @click="onMe()">
          <v-icon style="font-size: 28px" :color="config.light.iconColor"
            >mdi-account-circle</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <div class="text-h5 grey--text text--darken-3 px-4 pt-4">
          {{firstName}} {{lastName}}
        </div>
        <div class="subtitle-2 primary--text font-weight-regular px-4">
          {{username}}
        </div>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in account" :key="i">
            <v-list-item-icon class="mr-4">
              <v-icon :color="item.color" v-text="item.icon"> </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                :color="config.light.textColor"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logOut"
            >Sign Out
          </v-btn>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "../../config";
import axios from "axios";

export default {
  name: "Header",
  components: {},
  data: () => ({
    config,
    searchCollapse: true,

    // account: [
    //   { text: "Profile", icon: "mdi-account", color: "textColor" },
    //   { text: "Tasks", icon: "mdi-thumb-up", color: "textColor" },
    //   { text: "Messages", icon: "mdi-flag", color: "textColor" },
    // ],
    username: '',
    firstName: '',
    lastName: '',
    notificationsBadge: true,
    messageBadge: true,
  }),
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    logOut: function () {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },

    async onMe() {
      let { data } = await axios.get("auth/me");
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      console.log('data', data)
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
