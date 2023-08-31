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
                    <v-row>
                      <v-expansion-panels>
                        <v-expansion-panel
                          v-for="(
                            checkoutDataEntry, index
                          ) in users.checkoutData"
                          :key="index">
                          <v-row>
                            <v-col cols="12" sm="11" md="11">
                              <v-expansion-panel-header
                                >Product {{ index + 1 }}
                              </v-expansion-panel-header>
                            </v-col>
                            <v-col cols="12" sm="1" md="1">
                              <v-btn
                                end
                                large
                                v-if="users.checkoutData.length > 1"
                                icon
                                @click="removeCheckoutDataEntry(index)">
                                <v-icon size="x-large" color="error"
                                  >mdi-close-circle-outline</v-icon
                                >
                              </v-btn>
                            </v-col>
                          </v-row>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <!-- <v-text-field
                                label="Kode Produk"
                                hint="Product Code"
                                outlined
                                required
                                v-model="
                                  checkoutDataEntry.productCode
                                "></v-text-field> -->
                                <v-autocomplete
                                  label="Kode Produk"
                                  hint="Product Code"
                                  outlined
                                  required
                                  item-value="exid"
                                  item-text="productCode"
                                  :disabled="isExported"
                                  :items="
                                    productCodes.map(
                                      (product) => product.productCode
                                    )
                                  "
                                  v-model="
                                    checkoutDataEntry.productCode
                                  "></v-autocomplete>
                                <v-text-field
                                  label="Nama Produk"
                                  hint="Product Name"
                                  outlined
                                  required
                                  disabled
                                  v-model="
                                    checkoutDataEntry.productName
                                  "></v-text-field>
                                <v-text-field
                                  label="Jumlah"
                                  hint="Product Quantity"
                                  outlined
                                  required
                                  type="number"
                                  :disabled="isExported"
                                  v-model="
                                    checkoutDataEntry.quantity
                                  "></v-text-field>
                                <v-text-field
                                  label="Berat /Produk"
                                  hint="Weight /product"
                                  outlined
                                  required
                                  :disabled="isExported"
                                  v-model="
                                    checkoutDataEntry.weightPerProduct
                                  "></v-text-field>
                                <v-text-field
                                  label="Berat Total"
                                  hint="Weight Total"
                                  outlined
                                  required
                                  disabled
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
                                  :disabled="isExported"
                                  type="number"
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
                                  type="number"
                                  :disabled="isExported"
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
                                  :disabled="isExported"
                                  v-model="
                                    checkoutDataEntry.bonus
                                  "></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
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
                      :disabled="isExported"
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
                      :disabled="isExported"
                      outlined></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      clearable
                      label="Kabupaten"
                      v-model="users.customerData.regency"
                      outlined
                      disabled></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      clearable
                      label="Provinsi"
                      v-model="users.customerData.province"
                      outlined
                      :disabled="isExported"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      clearable
                      label="Kabupaten/Kota"
                      v-model="users.customerData.regency"
                      :disabled="isExported"
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-autocomplete
                      clearable
                      label="Kecamatan"
                      v-model="users.customerData.district"
                      :items="districts"
                      :disabled="isExported"
                      outlined></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6"
                    ><v-text-field
                      label="Biaya Penanganan"
                      v-model="users.deliveryData.handlingFee"
                      outlined
                      required
                      disabled></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="6"
                    ><v-text-field
                      label="Diskon Ongkir"
                      v-model="users.deliveryData.deliveryDiscount"
                      outlined
                      required
                      type="number"
                      :disabled="isExported"
                      @input="calculateTotalDelivery"></v-text-field
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
                      @input="calculateTotalDelivery"></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Berat Total"
                      outlined
                      required
                      v-model="totalWeight"
                      disabled
                      readonly></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="4" md="4"
                    ><v-text-field
                      label="Jumlah"
                      outlined
                      required
                      :value="totalOngkosKirim"
                      disabled
                      readonly></v-text-field
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
                      required
                      :disabled="isExported"></v-textarea>
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
import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";
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

  components: {
    VueSweetalert2,
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
      totalWeight: 0,
      districts: [],
      regencies: [],
      provinces: [],
      selectedProductCode: "",
      selectedData: null,
      selectedExpedition: null,
      selectedWarehouse: null,
      productCodes: [
        {
          productCode: "nut",
          exid: "nut",
          productName: "nutriflakes",
        },
        {
          productCode: "zym",
          exid: "zym",
          productName: "zymuno",
        },
        {
          productCode: "bio",
          exid: "bio",
          productName: "bio insuleaf",
        },
        {
          productCode: "lin",
          exid: "lin",
          productName: "etawalin",
        },
        {
          productCode: "eta",
          exid: "eta",
          productName: "etawaku",
        },
        {
          productCode: "fre",
          exid: "fre",
          productName: "freshmag",
        },
      ],
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
    const jsonDataArrays = [
      this.jnt_cilacap_json,
      this.jnt_kosambi_json,
      this.jnt_tandes_json,
      this.ninja_cilacap_json,
      this.ninja_kosambi_json,
      this.ninja_tandes_json,
      this.sicepat_cilacap_json,
      this.sicepat_kosambi_json,
      this.sicepat_tandes_json,
    ];

    this.districts = [].concat(
      ...jsonDataArrays.map((data) => data.map((item) => item.district))
    );
    this.regencies = [].concat(
      ...jsonDataArrays.map((data) => data.map((item) => item.regency))
    );

    this.totalWeight = this.calculateTotalWeight();
  },

  computed: {
    // Menghitung Total Ongkos Kirim Dengan Berat Pembulatan
    totalOngkosKirim() {
      const deliveryFee = parseFloat(this.users.deliveryData.deliveryFee);
      const totalWeight = parseFloat(this.totalWeight); // Use the data property here

      if (!isNaN(deliveryFee) && !isNaN(totalWeight)) {
        let roundedWeight = Math.ceil(totalWeight);
        if (roundedWeight < 1) {
          roundedWeight = 1;
        }
        return deliveryFee * roundedWeight;
      } else {
        return null;
      }
    },

    isExported() {
      return this.users.isExported;
    },

    // Menghitung Total Ongkos Kirim Dengan Berat Tanpa Pembulatan
    // totalOngkosKirim() {
    //   const deliveryFee = parseFloat(this.users.deliveryData.deliveryFee);
    //   const totalWeight = parseFloat(this.totalWeight);

    //   if (!isNaN(deliveryFee) && !isNaN(totalWeight)) {
    //     return deliveryFee * totalWeight;
    //   } else {
    //     return null;
    //   }
    // },
  },

  methods: {
    fetchData() {
      axios
        .get(
          // "https://formorder.gawebecik.com/orders/" + this.$route.params.id + "/details"
          "http://localhost:8080/orders/" + this.$route.params.id + "/details"
        )
        .then((response) => {
          //   console.log("API Response Data:", response.data);

          this.users = response.data.data;
          this.isLoading = false;

          this.isExported = this.users.isExported;

          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },

    // Menghitung Jumlah Harga Produk
    calculateSumPrice(checkoutDataEntry) {
      if (checkoutDataEntry.pricePerProduct && checkoutDataEntry.quantity) {
        checkoutDataEntry.sumPrice =
          checkoutDataEntry.pricePerProduct * checkoutDataEntry.quantity;
      } else {
        checkoutDataEntry.sumPrice = null;
      }
    },

    // Menghitung Jumlah Harga Produk Setelah Diskon
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
      // this.calculateTotalPayment();
    },

    // Menghitung Jumlah Berat Produk
    calculateWeightTotal(checkoutDataEntry) {
      if (checkoutDataEntry.quantity && checkoutDataEntry.weightPerProduct) {
        checkoutDataEntry.weightTotal =
          checkoutDataEntry.quantity * checkoutDataEntry.weightPerProduct;
      } else {
        checkoutDataEntry.weightTotal = null;
      }

      this.calculateTotalDelivery();
    },

    // Menghitung Total Biaya Produk
    calculateTotalProductCost() {
      let totalProductCost = 0;
      this.users.checkoutData.forEach((entry) => {
        if (entry.sumPrice) {
          totalProductCost += entry.sumPrice;
        }
      });
      this.users.totalProductCost = totalProductCost;
    },

    // Menghitung Total Berat Produk Keseluruhan
    calculateTotalWeight() {
      let totalWeight = 0;
      this.users.checkoutData.forEach((entry) => {
        if (entry.weightTotal) {
          totalWeight += parseFloat(entry.weightTotal);
        }
      });
      return totalWeight;
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

    // Mengambil Data Ongkir Dari JSON Sesuai Dengan Filter
    calculateTotalDeliveryCost() {
      const selectedExpedition = this.users.deliveryData.expedition;
      const selectedWarehouse = this.users.deliveryData.warehouse;
      const selectedDistrict = this.users.customerData.district;

      if (selectedExpedition && selectedWarehouse && selectedDistrict) {
        let selectedData = null;
        let jsonData = [];

        if (selectedExpedition === "jnt") {
          if (selectedWarehouse === "cilacap") {
            jsonData = this.jnt_cilacap_json;
          } else if (selectedWarehouse === "kosambi") {
            jsonData = this.jnt_kosambi_json;
          } else if (selectedWarehouse === "tandes") {
            jsonData = this.jnt_tandes_json;
          }
        } else if (selectedExpedition === "ninja") {
          if (selectedWarehouse === "cilacap") {
            jsonData = this.ninja_cilacap_json;
          } else if (selectedWarehouse === "kosambi") {
            jsonData = this.ninja_kosambi_json;
          } else if (selectedWarehouse === "tandes") {
            jsonData = this.ninja_tandes_json;
          }
        } else if (selectedExpedition === "sicepat") {
          if (selectedWarehouse === "cilacap") {
            jsonData = this.sicepat_cilacap_json;
          } else if (selectedWarehouse === "kosambi") {
            jsonData = this.sicepat_kosambi_json;
          } else if (selectedWarehouse === "tandes") {
            jsonData = this.sicepat_tandes_json;
          }
        }

        selectedData = jsonData.find(
          (item) => item.district === selectedDistrict
        );

        if (selectedData) {
          this.users.deliveryData.deliveryFee = selectedData.delivery_cost;

          // Update the deliveryDiscount from API here
          // this.users.deliveryData.deliveryDiscount =
          //   selectedData.delivery_discount || 0;

          // Hitung ulang the total payment
          this.calculateTotalPayment();
        } else {
          this.users.deliveryData.deliveryFee = null;
          // this.users.deliveryData.deliveryDiscount = null; // Reset discount when no data found
        }
      }
    },

    // Menghitung Total Biaya Pengiriman
    calculateTotalDelivery() {
      const deliveryFee = this.users.deliveryData.deliveryFee;
      // const deliveryDiscountFromApi = this.users.deliveryData.deliveryDiscount; // Tidak perlu lagi
      const deliveryDiscount = this.users.deliveryData.deliveryDiscount || 0;

      if (deliveryFee !== null && !isNaN(deliveryFee)) {
        const handlingFee =
          parseFloat(this.users.deliveryData.handlingFee) || 0;
        const totalOngkosKirim = parseFloat(this.totalOngkosKirim) || 0;
        this.users.totalDeliveryCost = totalOngkosKirim + handlingFee;
        this.users.totalDeliveryDiscount = deliveryDiscount; // Mengikuti nilai deliveryDiscount

        // Jika deliveryDiscount diisi oleh pengguna, gunakan nilai tersebut untuk perhitungan total pembayaran
        if (!isNaN(deliveryDiscount)) {
          this.calculateTotalPayment();
        }
      } else {
        this.users.totalDeliveryCost = null;
        this.users.totalDeliveryDiscount = null;
      }

      if (
        this.users.deliveryData.deliveryDiscount === null ||
        this.users.deliveryData.deliveryDiscount === undefined
      ) {
        this.users.deliveryData.deliveryDiscount = 0;
      }
    },

    // Menghitung Biaya Penanganan
    calculateHandlingFee() {
      const totalProductCost = parseFloat(this.users.totalProductCost);
      const totalOngkosKirim = parseFloat(this.totalOngkosKirim);

      if (!isNaN(totalProductCost) && !isNaN(totalOngkosKirim)) {
        const totalCost = totalProductCost + totalOngkosKirim;
        const handlingFee = totalCost * 0.03;
        this.users.deliveryData.handlingFee =
          Math.ceil(parseFloat(handlingFee.toFixed(2)) / 100) * 100;
      } else {
        this.users.deliveryData.handlingFee = null;
      }

      this.calculateTotalPayment();
    },

    // Menghitung Total Pembayaran
    calculateTotalPayment() {
      if (
        this.users.totalProductCost !== null &&
        this.users.totalDeliveryCost !== null &&
        this.users.totalProductDiscount !== null
      ) {
        // Update totalPayment calculation to consider deliveryDiscount
        this.users.totalPayment =
          parseFloat(this.users.totalProductCost) +
          parseFloat(this.users.totalDeliveryCost) -
          parseFloat(this.users.totalProductDiscount) -
          parseFloat(this.users.deliveryData.deliveryDiscount || 0);
      } else {
        this.users.totalPayment = null;
      }
    },

    // Fungsi Untuk Memfilter Berdasarkan Ekspedisi & Gudang
    filterDataByExpeditionAndWarehouse() {
      const selectedExpedition = this.users.deliveryData.expedition;
      const selectedWarehouse = this.users.deliveryData.warehouse;

      if (!selectedExpedition || !selectedWarehouse) {
        this.districts = [];
        return;
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
      // this.users.deliveryData.deliveryDiscount = null;

      // Update data districts dengan data yang sesuai
      this.districts = filteredData.map((item) => item.district);

      const selectedDistrict = this.users.customerData.district;

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

      this.filteredData = filteredData;
    },

    // Hapus Data Product
    removeCheckoutDataEntry(index) {
      // Tampilkan kotak dialog konfirmasi
      this.$swal({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menghapus data ini?",
        icon: "warning",
        buttons: ["Batal", "Hapus"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // Jika pengguna menekan tombol 'Hapus', lanjutkan dengan penghapusan data
          this.users.checkoutData.splice(index, 1);
          this.updateCheckOutData();

          if (this.users.checkoutData.length === 0) {
            this.isLoading = false;
          }

          this.$swal("Data telah dihapus!", {
            icon: "success",
          });
        } else {
          // Jika pengguna membatalkan penghapusan, tidak ada tindakan yang diambil
          this.$swal("Penghapusan dibatalkan.", {
            icon: "info",
          });
        }
      });
    },

    updateCheckOutData() {
      this.users.checkoutData.forEach((entry, index) => {
        this.calculateSumPrice(entry);
        this.calculateTotalPrice(entry);
        this.calculateWeightTotal(entry);
        this.calculateTotalDeliveryCost(entry);
        this.calculateTotalDelivery(entry);
        this.calculateTotalPayment(entry);
        this.totalWeight = this.calculateTotalWeight();
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
          this.totalWeight = this.calculateTotalWeight();
          const selectedProduct = this.productCodes.find(
            (product) => product.productCode === entry.productCode
          );

          if (selectedProduct) {
            entry.productName = selectedProduct.productName;
          }
        });
      },
    },

    totalWeight: {
      handler(newWeight, oldWeight) {
        // Memeriksa totalWeight berubah
        if (newWeight !== oldWeight) {
          // Menghitung Ulang Delivery Fee
          this.users.deliveryData.deliveryFee = this.totalOngkosKirim;
          // Memanggil fungsi calculateTotalPayment()
          this.calculateTotalPayment();
        }
      },
    },

    totalOngkosKirim: {
      handler(newTotalOngkosKirim, oldTotalOngkosKirim) {
        // Only update totalDeliveryCost and totalPayment when totalOngkosKirim changes
        if (newTotalOngkosKirim !== oldTotalOngkosKirim) {
          this.calculateTotalDelivery();
          this.calculateTotalPayment();
        }
      },
    },

    "users.deliveryData.handlingFee": {
      handler(newHandlingFee, oldHandlingFee) {
        // Only update totalDeliveryCost and totalPayment when handlingFee changes
        if (newHandlingFee !== oldHandlingFee) {
          this.calculateTotalDelivery();
          this.calculateTotalPayment();
        }
      },
    },

    "checkoutDataEntry.productCode": function (newProductCode, oldProductCode) {
      const selectedProduct = this.productCodes.find(
        (product) => product.productCode === newProductCode
      );

      if (selectedProduct) {
        this.checkoutDataEntry.productName = selectedProduct.productName;
      }
    },

    "users.deliveryData.expedition": function (newExpedition, oldExpedition) {
      if (newExpedition !== oldExpedition) {
        this.users.deliveryData.handlingFee = null;
      }
      this.filterDataByExpeditionAndWarehouse();
      this.filterRegencies();
    },

    "users.deliveryData.warehouse": function (newWarehouse, oldWarehouse) {
      if (newWarehouse !== oldWarehouse) {
        this.users.deliveryData.handlingFee = null;
      }
      this.filterDataByExpeditionAndWarehouse();
      this.filterRegencies();
    },

    "users.customerData.district": function (newDistrict, oldDistrict) {
      if (newDistrict !== oldDistrict) {
        // Reset handlingFee ketika data district berubah
        this.users.deliveryData.handlingFee = null;
        // this.updateRegencyValue();
      }

      if (newDistrict) {
        // Mencari data district yang dipilih sesuai dengan data JSON
        const selectedRegencyData = this.filteredData.find(
          (item) => item.district === newDistrict
        );

        // Mengupdate deliveryFee berdasarkan district yang dipilih dengan mengambil data JSON delivery_cost
        if (selectedRegencyData) {
          this.users.deliveryData.deliveryFee =
            selectedRegencyData.delivery_cost;
        } else {
          this.users.deliveryData.deliveryFee = null;
        }

        // menghitung ulang total delivery cost ketika district berubah
        this.calculateTotalDeliveryCost();
      }
    },

    "users.deliveryData.deliveryDiscount": function (newDiscount, oldDiscount) {
      if (newDiscount !== oldDiscount) {
        this.calculateTotalPayment();
      }
    },

    "users.customerData.province": "filterRegencies",
    "users.customerData.regency": "filterDistricts",

    "users.deliveryData.deliveryFee": "calculateTotalOngkir",
    "users.totalProductCost": "calculateTotalOngkir",

    "users.deliveryData.expedition": "filterDataByExpeditionAndWarehouse",
    "users.deliveryData.warehouse": "filterDataByExpeditionAndWarehouse",
    "users.customerData.district": "calculateTotalDeliveryCost",

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
