<template>
  <div>
    <CustomerData v-bind:users="users" v-on:users-loaded="users = $event" />
    <!-- <CustomerData /> -->
    <CheckOutData v-bind:users="users" v-on:users-loaded="users = $event" />
    <SalesData v-bind:users="users" v-on:users-loaded="users = $event" />
    <DeliveryData v-bind:users="users" v-on:users-loaded="users = $event" />
    <TotalData v-bind:users="users" v-on:users-loaded="users = $event" />
    <v-container class="button-wrapper">
      <v-skeleton-loader v-if="isLoading"></v-skeleton-loader>
      <v-btn
        v-else
        depressed
        class="me-4"
        color="error"
        dark
        @click="cancelUpdate"
        >Cancel</v-btn
      >
      <v-skeleton-loader v-if="isLoading"></v-skeleton-loader>
      <v-btn v-else depressed color="success" @click="updateData"> Save </v-btn>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import CustomerData from "../components/CustomerDataCard.vue";
import CheckOutData from "../components/CheckOutDataCard.vue";
import SalesData from "../components/SalesDataCard";
import DeliveryData from "../components/DeliveryDataCard.vue";
import TotalData from "../components/TotalDataCard.vue";

export default {
  name: "FormView",
  components: {
    CustomerData,
    CheckOutData,
    SalesData,
    DeliveryData,
    TotalData,
    VueSweetalert2,
  },
  data() {
    return {
      users: {},
      panel: [],
      disabled: false,
      isLoading: true,
      text: "",
    };
  },

  mounted() {
    this.hideSkeleton();
  },

  methods: {
    updateData() {
      axios
        .patch(
          "http://localhost:8080/orders/" + this.users.id,
          this.users
        )
        .then((response) => {
          this.$swal("Data Berhasil Disimpan");
          console.log(response);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.$swal("Data Gagal Disimpan");
          this.validation = error.response.data.data;
        });
    },
    cancelUpdate() {
      this.$router.push({ name: "home" });
    },
    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },

  created() {
    // Listen for the 'sales-data-updated' event emitted by SalesDataCard
    this.$on("sales-data-updated", this.handleSalesDataUpdated);
  },
};
</script>
<style>
.button-wrapper {
  right: 6%;
  display: flex;
  justify-content: end;
  position: absolute;
  margin: 0;
}
</style>
