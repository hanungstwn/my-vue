<template>
  <v-app>
    <v-app-bar
      app
      color="warning"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="GENAH Logo"
          class="shrink ml-4"
          contain
          src="./assets/logo-gb.png"
          transition="scale-transition"
          width="40"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="/"
        text
      >
        <span class="mr-2">HISTORY DATA</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
