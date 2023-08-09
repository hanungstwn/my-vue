<template>
  <v-form>
    <v-row>
      <v-card-text>
        <v-container>
          <template>
            <v-card class="custom-card">
              <h2 class="text-center mb-10">Customer Data</h2>
              <v-row>
                <!-- Customer Data -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nama Customer"
                    hint="Customer Name"
                    outlined
                    required
                    v-model="users.customerData.custName"></v-text-field>
                  <v-text-field
                    class="custom-field"
                    label="Nomor Whatsapp"
                    hint="Customer Whatsapp Number"
                    outlined
                    required
                    v-model="users.customerData.custWhatsapp"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Kecamatan"
                    hint="Customer District"
                    outlined
                    required
                    v-model="users.customerData.district"></v-text-field>
                  <v-text-field
                    label="Kabupaten"
                    hint="Customer Regency"
                    outlined
                    required
                    v-model="users.customerData.regency"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat Lengkap"
                    hint="Full Address"
                    outlined
                    required
                    v-model="users.customerData.fullAddress"></v-textarea>
                </v-col>
              </v-row>
            </v-card>

            <!-- Checkout Data -->
            <v-card class="custom-card">
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
                              hint="example of helper text only on focus"
                              outlined
                              required
                              v-model="
                                checkoutDataEntry.pricePerProduct
                              "></v-text-field>
                            <v-text-field
                              label="Jumlah Harga"
                              hint="example of helper text only on focus"
                              outlined
                              required
                              v-model="
                                checkoutDataEntry.sumPrice
                              "></v-text-field>
                            <v-text-field
                              label="Diskon"
                              hint="example of helper text only on focus"
                              outlined
                              required
                              v-model="
                                checkoutDataEntry.discount
                              "></v-text-field>
                            <v-text-field
                              label="Total Harga"
                              hint="example of helper text only on focus"
                              outlined
                              required
                              v-model="
                                checkoutDataEntry.totalPrice
                              "></v-text-field>
                            <v-text-field
                              label="Bonus"
                              hint="example of helper text only on focus"
                              outlined
                              required
                              v-model="checkoutDataEntry.bonus"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </template>
            </v-card>

            <!-- Sales Data -->
            <v-card class="custom-card">
              <h2 class="text-center mt-4 mb-10">Sales Data</h2>
              <v-row>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Nama CS"
                    outlined
                    required
                    v-model="users.salesData.csName"></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Nama ADV"
                    outlined
                    required
                    v-model="users.salesData.advName"></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Sumber Iklan"
                    outlined
                    required
                    v-model="users.salesData.sourceAds"></v-text-field
                ></v-col>
              </v-row>
            </v-card>

            <!-- Delivery Data -->
            <v-card class="custom-card">
              <h2 class="text-center mt-4 mb-10">Delivery Data</h2>
              <v-row>
                <v-col cols="12" sm="6" md="6"
                  ><v-text-field
                    label="Nama Ekspedisi"
                    outlined
                    required
                    v-model="users.deliveryData.expedition"></v-text-field
                ></v-col>
                <v-col cols="12" sm="6" md="6"
                  ><v-text-field
                    label="Gudang"
                    outlined
                    required
                    v-model="users.deliveryData.warehouse"></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Ongkos Kirim"
                    outlined
                    required
                    disabled
                    v-model="users.deliveryData.deliveryFee"></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Biaya Penanganan"
                    outlined
                    required
                    disabled
                    v-model="users.deliveryData.handlingFee"></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Diskon Ongkir"
                    outlined
                    required
                    v-model="users.deliveryData.deliveryDiscount"></v-text-field
                ></v-col>
              </v-row>
            </v-card>

            <!-- Total Data -->
            <v-card class="custom-card">
              <h2 class="text-center mt-4 mb-10">Total Data</h2>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Biaya Produk"
                    outlined
                    required
                    disabled
                    v-model="users.totalProductCost"></v-text-field>
                  <v-text-field
                    label="Total Biaya Pengiriman"
                    outlined
                    required
                    disabled
                    v-model="users.totalDeliveryCost"></v-text-field>
                  <v-text-field
                    label="Total Pembayaran"
                    outlined
                    required
                    disabled
                    v-model="users.totalPayment"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Diskon Produk"
                    outlined
                    required
                    disabled
                    v-model="users.totalProductDiscount"></v-text-field>
                  <v-text-field
                    label="Total Diskon Pengiriman"
                    outlined
                    required
                    disabled
                    v-model="users.totalDeliveryDiscount"></v-text-field>
                  <v-text-field
                    label="Metode Pembayaran"
                    outlined
                    required
                    disabled
                    v-model="users.paymentMethod"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Catatan Kurir"
                    outlined
                    required
                    v-model="users.courierNotes"></v-textarea>
                </v-col>
              </v-row>
            </v-card>
            <v-container class="button-wrapper">
              <v-btn
                depressed
                class="me-4"
                color="error"
                dark
                @click="cancelUpdate"
                >Cancel</v-btn
              >
              <v-btn depressed color="success" @click="updateData">
                Save
              </v-btn>
            </v-container>
          </template>
        </v-container>
      </v-card-text>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";

export default {
  name: "FormOrder",

  data() {
    return {
      users: [],
      panel: [],
      disabled: false,
      isLoading: true,
      text: "",
    };
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  created() {
    axios
      .get("https://formorder.gawebecik.com/orders/" + this.$route.params.id + "/details")
      .then((response) => {
        this.users = response.data.data;
        if (Array.isArray(this.users)) {
          // Check if this.users is an array
          this.users.forEach((user) => {
            user.createdAt = moment(user.createdAt).format("DD MMMM YYYY");
          });
        } else {
          console.error("Unexpected data format for users");
        }
        this.isLoading = false;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateData() {
      axios
        .patch(
          "https://formorder.gawebecik.com/orders/" + this.$route.params.id + "/details",
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
  },
  components: {
    VueSweetalert2,
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
