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

      <!-- Delivery Data -->
      <v-card-text>
        <v-container>
          <template>
            <v-card class="custom-card">
              <v-skeleton-loader
                type="paragraph"
                v-if="isLoading"></v-skeleton-loader>
              <div v-else>
                <h2 class="text-center mt-4 mb-10">Delivery Data</h2>
                <v-row>
                  <v-col cols="12" sm="4" md="4"
                    ><v-autocomplete
                      clearable
                      label="Ekspedisi"
                      v-model="users.deliveryData.expedition"
                      :items="expeditions"
                      item-value="exid"
                      item-text="expedition"
                      outlined></v-autocomplete
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-autocomplete
                      clearable
                      label="Gudang"
                      v-model="users.deliveryData.warehouse"
                      :items="warehouse"
                      item-value="exid"
                      item-text="warehouse"
                      outlined></v-autocomplete
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-autocomplete
                      clearable
                      label="Kecamatan Tujuan"
                      :items="['Jnt', 'Ninja', 'Sicepat']"
                      outlined></v-autocomplete
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Ongkos Kirim"
                      v-model="users.deliveryData.deliveryFee"
                      outlined
                      required
                      disabled
                      @input="calculateTotalDeliveryCost"></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Biaya Penanganan"
                      v-model="users.deliveryData.handlingFee"
                      outlined
                      required
                      disabled></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Diskon Ongkir"
                      v-model="users.deliveryData.deliveryDiscount"
                      outlined
                      required
                      @input="calculateTotalDeliveryCost"></v-text-field
                  ></v-col>
                </v-row>
              </div>
            </v-card>
          </template>
        </v-container>
      </v-card-text>

      <!-- Total Data -->
      <v-card-text>
        <v-container>
          <template>
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
                      label="Catatan Kurir"
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
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
import jnt_cilacap_json from "../json/jnt/jnt_cilacap.json";
// import json from "../json/jnt/jnt_kosambi.json";
// import json from "../json/jnt/jnt_tandes.json";
// import json from "../json/ninja/ninja_cilacap.json";
// import json from "../json/ninja/ninja_kosambi.json";
// import json from "../json/ninja/ninja_tandes.json";
// import json from "../json/sicepat/sicepat_cilacap.json";
// import json from "../json/sicepat/sicepat_kosambi.json";
// import json from "../json/sicepat/sicepat_tandes.json";

export default {
  name: "CoDelivTotal",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      jnt_cilacap_json: jnt_cilacap_json, // Or whichever JSON data you want to use.
      isLoading: true,
      text: "",
      selectedExpedition: null,
      selectedWarehouse: null,
      expeditions: [
        {
          expedition: "Jnt",
          exid: "jnt",
        },
        {
          expedition: "Ninja",
          exid: "ninja",
        },
        {
          expedition: "SiCepat",
          exid: "sicepat",
        },
      ],
      warehouse: [
        {
          warehouse: "Kosambi",
          exid: "kosambi",
        },
        {
          warehouse: "Tandes",
          exid: "tandes",
        },
        {
          warehouse: "Cilacap",
          exid: "cilacap",
        },
      ],
    };
  },

  mounted() {
    this.hideSkeleton();
    this.fetchData();
    this.calculateTotalProductCost();
    this.calculateDiscountAllProduct();
  },

  methods: {
    fetchData() {
      axios
        .get(
          "http://localhost:8080/orders/" + this.$route.params.id + "/details"
        )
        .then((response) => {
          //   console.log("API Response Data:", response.data);

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
      if (
        checkoutDataEntry.sumPrice &&
        checkoutDataEntry.discount !== null &&
        checkoutDataEntry.discount !== undefined
      ) {
        checkoutDataEntry.totalPrice =
          checkoutDataEntry.sumPrice - checkoutDataEntry.discount;
      } else {
        checkoutDataEntry.totalPrice = null; // Handle jika salah satu atau kedua field belum terisi atau discount adalah nilai default
      }
      this.calculateTotalProductCost();
      this.calculateDiscountAllProduct();
    },

    calculateWeightTotal(checkoutDataEntry) {
      if (checkoutDataEntry.quantity && checkoutDataEntry.weightPerProduct) {
        checkoutDataEntry.weightTotal =
          checkoutDataEntry.quantity * checkoutDataEntry.weightPerProduct;
      } else {
        checkoutDataEntry.weightTotal = null; // Handle jika salah satu atau kedua field belum terisi
      }
    },

    calculateTotalProductCost() {
      let totalProductCost = 0;
      this.users.checkoutData.forEach((entry) => {
        if (entry.totalPrice) {
          totalProductCost += entry.totalPrice;
        }
      });
      this.users.totalProductCost = totalProductCost;
    },

    calculateDiscountAllProduct() {
      let totalProductDiscount = 0;
      this.users.checkoutData.forEach((entry) => {
        if (entry.discount) {
          totalProductDiscount += parseFloat(entry.discount); // Convert to a number and add to the totalProductDiscount
        }
      });
      this.users.totalProductDiscount = totalProductDiscount;
    },

    calculateTotalDeliveryCost() {
      if (
        this.users.deliveryData.deliveryFee &&
        this.users.deliveryData.deliveryDiscount !== null &&
        this.users.deliveryData.deliveryDiscount !== undefined
      ) {
        this.users.totalDeliveryCost =
          this.users.deliveryData.deliveryFee -
          this.users.deliveryData.deliveryDiscount +
          this.users.deliveryData.handlingFee;

        // Set totalDeliveryDiscount to be the same as deliveryDiscount
        this.users.totalDeliveryDiscount =
          this.users.deliveryData.deliveryDiscount;
      } else {
        this.users.totalDeliveryCost = null; // Handle jika salah satu atau kedua field belum terisi atau deliveryDiscount adalah nilai default
        this.users.totalDeliveryDiscount = null; // Handle jika salah satu atau kedua field belum terisi atau deliveryDiscount adalah nilai default
      }
    },

    calculateTotalPayment() {
      if (this.users.totalProductCost && this.users.totalDeliveryCost) {
        this.users.totalPayment =
          this.users.totalProductCost + this.users.totalDeliveryCost;
      } else {
        this.users.totalPayment = null; // Handle jika salah satu atau kedua field belum terisi
      }
    },

    updateCheckOutData() {
      this.users.checkoutData.forEach((entry, index) => {
        this.calculateSumPrice(entry);
        this.calculateTotalPrice(entry);
        this.calculateWeightTotal(entry);
        this.calculateTotalDeliveryCost(entry);
        this.calculateTotalPayment(entry);
      });

      this.calculateTotalProductCost();

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
          this.calculateTotalDeliveryCost(entry);
          this.calculateTotalPayment(entry);
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
