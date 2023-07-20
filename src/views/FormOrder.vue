<template>
  <v-form>
    <v-row>
      <!-- <h1>History Data Customer {{ $route.params.id }}</h1> -->
      <v-card-text>
        <v-container>
          <h4 class="text-center mb-3">Customer Data</h4>
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

          <!-- Checkout Data -->
          <h4 class="text-center mt-4 mb-4">Checkout Data</h4>
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
                          v-model="checkoutDataEntry.quantity"></v-text-field>
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
                          v-model="checkoutDataEntry.sumPrice"></v-text-field>
                        <v-text-field
                          label="Diskon"
                          hint="example of helper text only on focus"
                          outlined
                          required
                          v-model="checkoutDataEntry.discount"></v-text-field>
                        <v-text-field
                          label="Total Harga"
                          hint="example of helper text only on focus"
                          outlined
                          required
                          v-model="checkoutDataEntry.totalPrice"></v-text-field>
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

          <!-- Sales Data -->
          <h4 class="text-center mt-4 mb-4">Sales Data</h4>
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

          <!-- Delivery Data -->
          <h4 class="text-center mt-4 mb-4">Delivery Data</h4>
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
                v-model="users.deliveryData.deliveryFee"></v-text-field
            ></v-col>
            <v-col cols="12" sm="4" md="4"
              ><v-text-field
                label="Biaya Penanganan"
                outlined
                required
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

          <!-- Total Data -->
          <h4 class="text-center mt-4 mb-4">Total Data</h4>
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
              <v-text-field
                label="Catatan Kurir"
                outlined
                required
                disabled
                v-model="users.courierNotes"></v-text-field>
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
              <v-text-field
                label="Tanggal"
                outlined
                required
                disabled
                v-model="users.createdAt"></v-text-field>
            </v-col>
          </v-row>
          <v-btn depressed class="me-4" color="error" dark>Cancel</v-btn>
          <v-btn depressed color="success"> Save </v-btn>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "FormOrder",

  data() {
    return {
      users: [],
      panel: [],
      disabled: false,
    };
  },

  mounted() {
    axios
      .get("http://localhost:8080/orders/" + this.$route.params.id + "/details")
      .then((response) => {
        this.users = response.data.data;
        // this.users.forEach((users) => {
        //   users.createdAt = moment(users.createdAt).format("DD MMMM YYYY");
        // });
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style></style>
