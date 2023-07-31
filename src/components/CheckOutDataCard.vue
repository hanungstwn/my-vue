<template>
  <v-form>
    <v-row>
      <v-card-text>
        <v-container>
          <template>
            <!-- Checkout Data -->
            <v-card class="custom-card">
              <v-skeleton-loader
                type="paragraph"
                v-if="isLoading"></v-skeleton-loader>
              <div v-else>
                <h2 class="text-center mt-4 mb-10">Checkout Data</h2>
                <template>
                  <div>
                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(checkoutDataEntry, index) in users.checkoutData"
                        :key="index">
                        <v-expansion-panel-header
                          >Product {{ index + 1 }}</v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Kode Produk"
                                hint="Product Code"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.productCode
                                "></v-text-field>
                              <v-text-field
                                label="Nama Produk"
                                hint="Product Name"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.productName
                                "></v-text-field>
                              <v-text-field
                                label="Jumlah"
                                hint="Product Quantity"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.quantity
                                "></v-text-field>
                              <v-text-field
                                label="Berat /Produk"
                                hint="Weight /product"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.weightPerProduct
                                "></v-text-field>
                              <v-text-field
                                label="Berat Total"
                                hint="Weight Total"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.weightTotal
                                "></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="Harga /Produk"
                                hint="Harga /Produk"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.pricePerProduct
                                "></v-text-field>
                              <v-text-field
                                label="Jumlah Harga"
                                hint="Jumlah harga"
                                outlined
                                required
                                disabled
                                v-model="
                                  checkoutDataEntry.sumPrice
                                "></v-text-field>
                              <v-text-field
                                label="Diskon"
                                hint="Diskon"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.discount
                                "></v-text-field>
                              <v-text-field
                                label="Total Harga"
                                hint="Total Harga"
                                outlined
                                disabled
                                required
                                v-model="
                                  checkoutDataEntry.totalPrice
                                "></v-text-field>
                              <v-text-field
                                label="Bonus"
                                hint="Bonus"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.bonus
                                "></v-text-field>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                </template>
              </div>
            </v-card>
          </template>
        </v-container>
      </v-card-text>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckoutData",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      users: [],
      isLoading: true,
      text: "",
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
          console.log("API Response Data:", response.data);

          this.users = response.data.data;
          this.isLoading = false;

          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },

    calculateSumPrice(checkoutDataEntry) {
      if (checkoutDataEntry.pricePerProduct && checkoutDataEntry.quantity) {
        checkoutDataEntry.sumPrice =
          checkoutDataEntry.pricePerProduct * checkoutDataEntry.quantity;
      } else {
        checkoutDataEntry.sumPrice = null; // Handle jika salah satu atau kedua field belum terisi
      }
    },

    calculateTotalPrice(checkoutDataEntry) {
      if (checkoutDataEntry.sumPrice && checkoutDataEntry.discount) {
        checkoutDataEntry.totalPrice =
          checkoutDataEntry.sumPrice - checkoutDataEntry.discount;
      } else {
        checkoutDataEntry.totalPrice = null; // Handle jika salah satu atau kedua field belum terisi
      }
    },

    calculateWeightTotal(checkoutDataEntry) {
      if (checkoutDataEntry.quantity && checkoutDataEntry.weightPerProduct) {
        checkoutDataEntry.weightTotal =
          checkoutDataEntry.quantity * checkoutDataEntry.weightPerProduct;
      } else {
        checkoutDataEntry.weightTotal = null; // Handle jika salah satu atau kedua field belum terisi
      }
    },

    updateCheckOutData() {
    this.users.checkoutData.forEach((entry, index) => {
      this.calculateSumPrice(entry);
      this.calculateTotalPrice(entry);
      this.calculateWeightTotal(entry);
    });

    this.$emit("users-updated", this.users);
  },
    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },

  watch: {
    "users.checkoutData": {
      deep: true,
      handler(newCheckoutData, oldCheckoutData) {
        newCheckoutData.forEach((entry, index) => {
          this.calculateSumPrice(entry);
          this.calculateTotalPrice(entry);
          this.calculateWeightTotal(entry);
        });
      },
    },
  },
};
</script>

<style>
.custom-card {
  margin-top: 20px;
  padding: 30px;
}
.button-wrapper {
  /* right: 0; */
  display: flex;
  justify-content: end;
  position: absolute;
  margin: 20px 20px 20px 0;
}
</style>
