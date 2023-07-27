<template>
  <v-app>
    <v-app-bar
      app
      color="#84d444"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/BAGONK-white.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="GENAH Logo"
          class="shrink ml-4"
          contain
          src="./assets/logo-fo.png"
          transition="scale-transition"
          width="40"
        />
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

<style>

</style>
