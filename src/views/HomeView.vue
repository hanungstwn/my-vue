<template>
  <div>
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <hello-world />
    </template>
  </div>
  <!-- <hello-world /> -->
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Spinner from "../components/Spinner.vue";

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
      }, 3000);
    },
  },
  mounted() {
    this.hideSpinner(); // Memanggil metode hideSpinner() untuk menyembunyikan spinner setelah sejumlah waktu tertentu
  },
};
</script>