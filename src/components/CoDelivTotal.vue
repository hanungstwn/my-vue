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
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      clearable
                      label="Ekspedisi"
                      v-model="users.deliveryData.expedition"
                      :items="expeditions"
                      item-value="exid"
                      item-text="expedition"
                      outlined></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      clearable
                      label="Gudang"
                      v-model="users.deliveryData.warehouse"
                      :items="warehouse"
                      item-value="exid"
                      item-text="warehouse"
                      outlined></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      clearable
                      label="Kabupaten"
                      v-model="users.customerData.regency"
                      outlined
                      disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      clearable
                      label="Kecamatan"
                      v-model="users.deliveryData.district"
                      :items="districts"
                      outlined></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Ongkos Kirim"
                      v-model="users.deliveryData.deliveryFee"
                      outlined
                      required
                      disabled
                      @input="calculateTotalDelivery"></v-text-field
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
                      @input="calculateTotalDelivery"></v-text-field
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
import jnt_kosambi_json from "../json/jnt/jnt_kosambi.json";
import jnt_tandes_json from "../json/jnt/jnt_tandes.json";
import ninja_cilacap_json from "../json/ninja/ninja_cilacap.json";
import ninja_kosambi_json from "../json/ninja/ninja_kosambi.json";
import ninja_tandes_json from "../json/ninja/ninja_tandes.json";
import sicepat_cilacap_json from "../json/sicepat/sicepat_cilacap.json";
import sicepat_kosambi_json from "../json/sicepat/sicepat_kosambi.json";
import sicepat_tandes_json from "../json/sicepat/sicepat_tandes.json";

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
      jnt_cilacap_json: jnt_cilacap_json,
      jnt_kosambi_json: jnt_kosambi_json,
      jnt_tandes_json: jnt_tandes_json,
      ninja_cilacap_json: ninja_cilacap_json,
      ninja_kosambi_json: ninja_kosambi_json,
      ninja_tandes_json: ninja_tandes_json,
      sicepat_cilacap_json: sicepat_cilacap_json,
      sicepat_kosambi_json: sicepat_kosambi_json,
      sicepat_tandes_json: sicepat_tandes_json,
      isLoading: true,
      text: "",
      districts: [],
      selectedData: null,
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
    this.districts = this.jnt_cilacap_json.map((item) => item.district);
    this.districts = this.jnt_kosambi_json.map((item) => item.district);
    this.districts = this.jnt_tandes_json.map((item) => item.district);
    this.districts = this.ninja_cilacap_json.map((item) => item.district);
    this.districts = this.ninja_kosambi_json.map((item) => item.district);
    this.districts = this.ninja_tandes_json.map((item) => item.district);
    this.districts = this.sicepat_cilacap_json.map((item) => item.district);
    this.districts = this.sicepat_kosambi_json.map((item) => item.district);
    this.districts = this.sicepat_tandes_json.map((item) => item.district);
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
        checkoutDataEntry.sumPrice = null;
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
        checkoutDataEntry.totalPrice = null;
      }
      this.calculateTotalProductCost();
      this.calculateDiscountAllProduct();
    },

    calculateWeightTotal(checkoutDataEntry) {
      if (checkoutDataEntry.quantity && checkoutDataEntry.weightPerProduct) {
        checkoutDataEntry.weightTotal =
          checkoutDataEntry.quantity * checkoutDataEntry.weightPerProduct;
      } else {
        checkoutDataEntry.weightTotal = null;
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
          totalProductDiscount += parseFloat(entry.discount);
        }
      });
      this.users.totalProductDiscount = totalProductDiscount;
    },

    calculateTotalDeliveryCost() {
      const selectedExpedition = this.users.deliveryData.expedition;
      const selectedWarehouse = this.users.deliveryData.warehouse;
      const selectedDistrict = this.users.deliveryData.district;

      if (selectedExpedition && selectedWarehouse && selectedDistrict) {
        let selectedData;
        if (selectedExpedition === "jnt") {
          if (selectedWarehouse === "cilacap") {
            selectedData = this.jnt_cilacap_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "kosambi") {
            selectedData = this.jnt_kosambi_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "tandes") {
            selectedData = this.jnt_tandes_json.find(
              (item) => item.district === selectedDistrict
            );
          }
        } else if (selectedExpedition === "ninja") {
          if (selectedWarehouse === "cilacap") {
            selectedData = this.ninja_cilacap_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "kosambi") {
            selectedData = this.ninja_kosambi_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "tandes") {
            selectedData = this.ninja_tandes_json.find(
              (item) => item.district === selectedDistrict
            );
          }
        } else if (selectedExpedition === "sicepat") {
          if (selectedWarehouse === "cilacap") {
            selectedData = this.sicepat_cilacap_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "kosambi") {
            selectedData = this.sicepat_kosambi_json.find(
              (item) => item.district === selectedDistrict
            );
          } else if (selectedWarehouse === "tandes") {
            selectedData = this.sicepat_tandes_json.find(
              (item) => item.district === selectedDistrict
            );
          }
        }

        if (selectedData) {
          this.users.deliveryData.deliveryFee = selectedData.delivery_cost;
        } else {
          this.users.deliveryData.deliveryFee = null;
        }

        // Reset field diskon ongkir menjadi kosong (null)
        this.users.deliveryData.deliveryDiscount = null;

        // Recalculate total delivery cost when the district changes
        this.calculateTotalPayment();
      }
    },

    calculateTotalDelivery() {
      const deliveryFee = this.users.deliveryData.deliveryFee;
      const deliveryDiscountFromApi = this.users.deliveryData.deliveryDiscount; // Default value from the API
      const deliveryDiscount =
        deliveryDiscountFromApi !== null &&
        deliveryDiscountFromApi !== undefined
          ? deliveryDiscountFromApi
          : 0; // Use the default value from API if available, otherwise use 0

      if (
        deliveryFee !== null &&
        deliveryDiscount !== null &&
        deliveryDiscount !== undefined
      ) {
        this.users.totalDeliveryCost =
          deliveryFee - deliveryDiscount + this.users.deliveryData.handlingFee;
        this.users.totalDeliveryDiscount = deliveryDiscount;
      } else {
        this.users.totalDeliveryCost = null;
        this.users.totalDeliveryDiscount = null;
      }

      // If deliveryDiscount is null or undefined, set it to 0
      if (
        this.users.deliveryData.deliveryDiscount === null ||
        this.users.deliveryData.deliveryDiscount === undefined
      ) {
        this.users.deliveryData.deliveryDiscount = 0;
      }
    },

    calculateHandlingFee() {
      if (this.users.totalProductCost && this.users.deliveryData.deliveryFee) {
        const totalCost =
          parseFloat(this.users.totalProductCost) +
          parseFloat(this.users.deliveryData.deliveryFee);
        const handlingFee = totalCost * 0.03;
        this.users.deliveryData.handlingFee =
          Math.ceil(parseFloat(handlingFee.toFixed(2)) / 100) * 100;
      } else {
        this.users.deliveryData.handlingFee = null;
      }

      // Recalculate the total payment when handling fee changes
      this.calculateTotalPayment();
    },

    calculateTotalPayment() {
      if (this.users.totalProductCost && this.users.totalDeliveryCost) {
        this.users.totalPayment =
          parseFloat(this.users.totalProductCost) +
          parseFloat(this.users.totalDeliveryCost);
      } else {
        this.users.totalPayment = null;
      }
    },

    filterDataByExpeditionAndWarehouse() {
      const selectedExpedition = this.users.deliveryData.expedition;
      const selectedWarehouse = this.users.deliveryData.warehouse;

      if (!selectedExpedition || !selectedWarehouse) {
        // If either expedition or warehouse is not selected, reset districts data
        // and do not proceed with updating delivery fee
        this.districts = [];
        return; // Exit the method early if expedition or warehouse is not selected
      }

      // Buat logika untuk memilih data sesuai dengan ekspedisi dan gudang yang dipilih
      let filteredData = [];
      if (selectedExpedition === "jnt") {
        if (selectedWarehouse === "cilacap") {
          filteredData = this.jnt_cilacap_json;
        } else if (selectedWarehouse === "kosambi") {
          filteredData = this.jnt_kosambi_json;
        } else if (selectedWarehouse === "tandes") {
          filteredData = this.jnt_tandes_json;
        }
      } else if (selectedExpedition === "ninja") {
        if (selectedWarehouse === "cilacap") {
          filteredData = this.ninja_cilacap_json;
        } else if (selectedWarehouse === "kosambi") {
          filteredData = this.ninja_kosambi_json;
        } else if (selectedWarehouse === "tandes") {
          filteredData = this.ninja_tandes_json;
        }
      } else if (selectedExpedition === "sicepat") {
        if (selectedWarehouse === "cilacap") {
          filteredData = this.sicepat_cilacap_json;
        } else if (selectedWarehouse === "kosambi") {
          filteredData = this.sicepat_kosambi_json;
        } else if (selectedWarehouse === "tandes") {
          filteredData = this.sicepat_tandes_json;
        }
      }

      // Reset field diskon ongkir menjadi kosong (null)
      this.users.deliveryData.deliveryDiscount = null;

      // Update data districts dengan data yang sesuai
      this.districts = filteredData.map((item) => item.district);

      // Update the deliveryFee based on the selected district's delivery_cost
      const selectedDistrict = this.users.deliveryData.district;
      if (selectedDistrict) {
        const selectedRegencyData = filteredData.find(
          (item) => item.district === selectedDistrict
        );
        if (selectedRegencyData) {
          this.users.deliveryData.deliveryFee =
            selectedRegencyData.delivery_cost;
        } else {
          this.users.deliveryData.deliveryFee = null;
        }
      } else {
        this.users.deliveryData.deliveryFee = null;
      }

      // Simpan data filteredData untuk digunakan dalam perhitungan total biaya
      this.filteredData = filteredData;
    },

    updateCheckOutData() {
      this.users.checkoutData.forEach((entry, index) => {
        this.calculateSumPrice(entry);
        this.calculateTotalPrice(entry);
        this.calculateWeightTotal(entry);
        this.calculateTotalDeliveryCost(entry);
        this.calculateTotalDelivery(entry);
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
          this.calculateTotalDelivery(entry);
          this.calculateTotalPayment(entry);
        });
      },
    },

    "users.deliveryData.expedition": function (newExpedition, oldExpedition) {
      if (newExpedition !== oldExpedition) {
        // Reset handlingFee when the expedition changes
        this.users.deliveryData.handlingFee = null;
      }
      this.filterDataByExpeditionAndWarehouse();
    },

    "users.deliveryData.warehouse": function (newWarehouse, oldWarehouse) {
      if (newWarehouse !== oldWarehouse) {
        // Reset handlingFee when the warehouse changes
        this.users.deliveryData.handlingFee = null;
      }
      this.filterDataByExpeditionAndWarehouse();
    },

    "users.deliveryData.district": function (newDistrict, oldDistrict) {
      if (newDistrict !== oldDistrict) {
        // Reset handlingFee when the district changes
        this.users.deliveryData.handlingFee = null;
      }

      if (newDistrict) {
        // Find the selected district in the appropriate JSON data
        const selectedRegencyData = this.filteredData.find(
          (item) => item.district === newDistrict
        );

        // Update the deliveryFee based on the selected district's delivery_cost
        if (selectedRegencyData) {
          this.users.deliveryData.deliveryFee =
            selectedRegencyData.delivery_cost;
        } else {
          this.users.deliveryData.deliveryFee = null;
        }

        // Recalculate total delivery cost when the district changes
        this.calculateTotalDeliveryCost();
      }
    },

    "users.deliveryData.expedition": "filterDataByExpeditionAndWarehouse",
    "users.deliveryData.warehouse": "filterDataByExpeditionAndWarehouse",
    "users.deliveryData.district": "calculateTotalDeliveryCost",

    "users.totalProductCost": "calculateHandlingFee",
    "users.totalDeliveryCost": "calculateHandlingFee",
    "users.deliveryData.deliveryFee": "calculateHandlingFee",
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
