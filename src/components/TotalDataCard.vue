<template>
  <v-form>
    <v-card-text>
      <v-container>
        <template>
          <!-- Total Data -->
          <v-card class="custom-card">
            <v-skeleton-loader
              type="paragraph"
              v-if="isLoading"></v-skeleton-loader>
            <div v-else>
              <h2 class="text-center mt-4 mb-10">Total Data</h2>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Biaya Produk"
                    v-model="users.totalProductCost"
                    outlined
                    required
                    disabled></v-text-field>
                  <v-text-field
                    label="Total Biaya Pengiriman"
                    v-model="users.totalDeliveryCost"
                    outlined
                    required
                    disabled></v-text-field>
                  <v-text-field
                    label="Total Pembayaran"
                    v-model="users.totalPayment"
                    outlined
                    required
                    disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Diskon Produk"
                    v-model="users.totalProductDiscount"
                    outlined
                    required
                    disabled></v-text-field>
                  <v-text-field
                    label="Total Diskon Pengiriman"
                    v-model="users.totalDeliveryDiscount"
                    outlined
                    required
                    disabled></v-text-field>
                  <v-text-field
                    label="Metode Pembayaran"
                    v-model="users.paymentMethod"
                    outlined
                    required
                    disabled></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Waktu"
                    v-model="users.courierNotes"
                    outlined
                    required></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </template>
      </v-container>
    </v-card-text>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "TotalData",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isLoading: true,
    };
  },

  mounted() {
    this.hideSkeleton();
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios
        .get(
          "http://localhost:8080/orders/" + this.$route.params.id + "/details"
        )
        .then((response) => {
          console.log("API Response Data:", response.data); // Add this line to see the response data

          this.users = response.data.data;
          this.isLoading = false;

          // Emit the event with the loaded users data
          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },
    updateTotalData() {
      // Your logic to update the total data
      // For example, you can update the 'users.totalData' object
      // ...

      // Emit an event to inform the parent (FormView.vue) about the data update
      this.$emit("users-updated", this.users);
    },
    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>
<style>
.custom-card {
  margin-top: 20px;
  padding: 30px;
}
</style>
