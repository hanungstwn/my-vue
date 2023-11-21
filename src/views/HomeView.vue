<template>
  <div>
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <hello-world />
    </template>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Spinner from "../components/Spinner.vue";
import axios from "axios";

export default {
  name: "Home",

  components: {
    HelloWorld,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    hideSpinner() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
  // created() {
  //   const token = localStorage.getItem("token");
  //   const apiKey = localStorage.getItem("X-API-Key");
  //   if (token, apiKey) {
  //     axios.defaults.headers.common["Authorization"] = token;
  //     axios.defaults.headers.common["X-API-Key"] = apiKey;
  //   }
  //   console.log(token);
  // },
  mounted() {
    this.hideSpinner();
  },
};
</script>