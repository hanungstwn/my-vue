<template>
  <v-card class="card-custom">
    <v-card-title class="card-title-custom">
      <!-- <v-btn
        dark
        variant="tonal"
        color="#1D6F42"
        class="me-4"
        @click="handleExportButtonClick"
        >Export</v-btn
      > -->
      <ExportData />
      <!-- <div class="date-input">
        <v-datetime-picker
          label="Start Date"
          v-model="startDate"
          class="date-input">
          <template slot="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </template>
          <template slot="timeIcon">
            <v-icon>mdi-clock-outline</v-icon>
          </template></v-datetime-picker
        >
      </div>
      <div class="date-input">
        <v-datetime-picker
          label="End Date"
          v-model="endDate"
          class="date-input">
          <template slot="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </template>
          <template slot="timeIcon">
            <v-icon>mdi-clock-outline</v-icon>
          </template></v-datetime-picker
        >
      </div>
      <div class="date-input">
        <v-select
          clearable
          v-model="selectedExpedition"
          label="Expedition"
          :items="expeditions"
          class="custom-select-field"
          item-text="expedition"
          item-value="exid"
          variant="underlined"></v-select>
      </div>
      <div class="date-input">
        <v-select
          clearable
          v-model="selectedWarehouse"
          label="Warehouse"
          :items="warehouse"
          class="custom-select-field"
          item-text="warehouse"
          item-value="exid"
          variant="underlined"></v-select>
      </div> -->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        class="custom-text-field"
        single-line
        hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      item-key="id"
      class="elevation-1"
      v-if="!loading">
      <template v-slot:item.no="{ item, index }">
        {{ startIndex + index + 1 }}
      </template>
      <template v-slot:item.isValidOrder="{ item }">
        <v-chip v-if="item.isValidOrder" color="success"> Benar </v-chip>
        <v-chip v-else color="error"> Salah </v-chip>
      </template>

      <template v-slot:item.isExported="{ item }">
        <v-icon v-if="item.isExported" size="x-large" color="#1B5E20"
          >mdi-file-check</v-icon
        >
        <v-icon v-else size="x-large" color="#D50000">mdi-file-excel</v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link v-if="item.isExported" :to="`/orders/${item.id}`">
          <v-btn small icon @click="confirmDeleteData(item)">
            <v-icon size="x-large" color="error">mdi-delete-circle</v-icon>
          </v-btn>
        </router-link>
        <FormDialog :key="item.id" :users="item" v-if="item.isExported" />
        <!-- <router-link :to="`/orders/${item.id}/details`" v-if="item.isExported" target="_blank">
          <v-btn small icon>
            <v-icon size="x-large" color="#ff8000">mdi-eye</v-icon>
          </v-btn>
        </router-link> -->
        <template v-else>
          <router-link :to="`/orders/${item.id}/details`">
            <v-btn small icon>
              <v-icon size="x-large" color="primary">mdi-pencil-circle</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="`/orders/${item.id}`">
            <v-btn small icon @click="confirmDeleteData(item)">
              <v-icon size="x-large" color="error">mdi-delete-circle</v-icon>
            </v-btn>
          </router-link>
        </template>
      </template>
      <!-- <FormDialog :key="item.id" :users="item" /> -->
    </v-data-table>
    <v-progress-linear v-else indeterminate color="success"></v-progress-linear>
    <template>
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
        navigation-color="#1B5E20"
        navigation-text-color="#FFFF"
        color="#1B5E20"
        @input="handlePageChange"></v-pagination>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import FormDialog from "./FormDialog.vue";
import ExportData from "./ExportData.vue";
import _debounce from "lodash/debounce";

export default {
  name: "HelloWorld",

  components: {
    VueSweetalert2,
    FormDialog,
    ExportData,
  },
  data() {
    return {
      search: "",
      startDate: null,
      endDate: null,
      selectedExpedition: null,
      selectedWarehouse: null,
      totalItems: 0,
      loading: false,
      currentPage: 0,
      totalPages: 0,
      page: 1,
      itemsPerPage: 10,
      startIndex: 0,
      debouncedSearch: "",
      selected: [],
      filteredItems: [],
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
      headers: [
        {
          align: "center",
          text: "No",
          value: "no",
        },
        {
          text: "Nama Customer",
          value: "customerData.custName",
        },
        {
          text: "Nomor HP",
          value: "customerData.custWhatsapp",
        },
        { text: "Diskon Ongkir", value: "deliveryData.deliveryDiscount" },
        { text: "Tanggal", value: "createdAtLocal" },
        {
          text: "Ekspedisi",
          value: "deliveryData.expedition",
        },
        { text: "Gudang", value: "deliveryData.warehouse" },
        { text: "Status", value: "isValidOrder" },
        { text: "Export", value: "isExported" },
        { text: "Action", value: "actions" },
      ],
      users: [],
      invalidDates: false,
    };
  },
  computed: {
    serverItems() {
      const startIndex = this.currentPage * this.itemsPerPage + 1;
      const endIndex = startIndex + this.itemsPerPage;

      return this.filteredItems.slice(startIndex, endIndex + 1);
    },
  },
  methods: {
    getData(page) {
      console.log("getData called with page:", page);
      if (typeof page !== "number" || page < 0) {
        return;
      }
      this.currentPage = page;
      const actualPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
      // const apiUrl = `http://localhost:8080/orders?page=${actualPage}`;
      const apiUrl = `https://formorder.gawebecik.com/orders?page=${actualPage}`;
      this.loading = true;

      axios
        .get(apiUrl)
        .then((res) => {
          if (!res.data || !res.data.data || res.data.data.length === 0) {
            this.$swal({
              title: "Tidak ada data yang ditemukan",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });

            this.loading = false;
            return;
          }

          const totalCount = res.data.totalCount;
          const data = res.data.data;

          this.users = data.map((user) => {
            // Ubah format UTC menjadi waktu lokal Indonesia (+7 jam)
            const createdAtLocal = moment
              .utc(user.createdAt)
              .utcOffset("+0700")
              .format("DD MMMM YYYY, HH:mm");

            // Tambahkan properti baru ke user untuk menyimpan createdAt dalam format waktu lokal
            user.createdAtLocal = createdAtLocal;

            return user;
          });

          this.totalItems = totalCount;
          this.totalPages = Math.ceil(totalCount / this.itemsPerPage);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.$swal({
            title: "Error fetching data",
            text: "Terjadi kesalahan saat mengambil data dari server API",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          this.loading = false;
        });
    },

    getDataSearch() {
      // const apiUrl = `http://localhost:8080/orders?search=${this.debouncedSearch}`;
      const apiUrl = `https://formorder.gawebecik.com/orders?search=${this.debouncedSearch}`;

      this.loading = true;

      axios
        .get(apiUrl)
        .then((res) => {
          if (!res.data || !res.data.data || res.data.data.length === 0) {
            this.$swal({
              title: "Tidak ada data yang ditemukan",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });

            this.loading = false;
            return;
          }

          const totalCount = res.data.totalCount;
          const data = res.data.data;

          this.users = data.map((user) => {
            // Ubah format UTC menjadi waktu lokal Indonesia (+7 jam)
            const createdAtLocal = moment
              .utc(user.createdAt)
              .utcOffset("+0700")
              .format("DD MMMM YYYY, HH:mm");

            // Tambahkan properti baru ke user untuk menyimpan createdAt dalam format waktu lokal
            user.createdAtLocal = createdAtLocal;

            return user;
          });

          this.totalItems = totalCount;
          this.totalPages = Math.ceil(totalCount / this.itemsPerPage);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.$swal({
            title: "Error fetching data",
            text: "Terjadi kesalahan saat mengambil data dari server API",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          this.loading = false;
        });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getData(this.currentPage);
    },

    confirmDeleteData(user) {
      Swal.fire({
        title: "Yakin Hapus Data?",
        text: "Data yang dihapus tidak dapat dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteData(user);
        } else this.$router.push({ name: "home" });
      });
    },

    deleteData(user) {
      axios
        .delete(`https://formorder.gawebecik.com/orders/${user.id}`)
        // .delete(`http://localhost:8080/orders/${user.id}`)
        .then((response) => {
          this.$swal("Data Berhasil Dihapus");
          console.log(response);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.$swal({
            title: "Data Gagal Dihapus",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          this.validation = error.response.data.data;
        });
    },

    async exportData() {
      try {
        // Format waktu GMT
        const formattedStartDate = this.startDate
          ? moment(this.startDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";
        const formattedEndDate = this.endDate
          ? moment(this.endDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";

        const selectedExpedition = this.selectedExpedition
          ? this.selectedExpedition
          : "";
        const selectedWarehouse = this.selectedWarehouse
          ? this.selectedWarehouse
          : "";

        const params = {
          expedition: selectedExpedition,
          warehouse: selectedWarehouse,
          timeStart: formattedStartDate,
          timeEnd: formattedEndDate,
        };

        const queryString = new URLSearchParams(params).toString();
        // const baseURL = "http://localhost:8080/orders/generate";
        const baseURL = "https://formorder.gawebecik.com/orders/generate";
        const URL = `${baseURL}?${queryString}`;
        const res = await axios({
          url: URL,
          method: "GET",
          responseType: "blob",
          headers: {},
        });

        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadLink = window.URL.createObjectURL(blob);
        const filename = `orders_${selectedExpedition}_${selectedWarehouse}_${moment().format(
          "YYYY-MM-DD_HHmmss"
        )}`;
        const anchor = document.createElement("a");
        anchor.href = downloadLink;
        anchor.download = `${filename}.xlsx`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(downloadLink);

        // Membuat array id di looping terus nilai yang ada dalam array dipassing ke request patch berdasarkan id dalam array
        // Fetch the data for updating isExported
        // const dataForUpdateUrl = `http://localhost:8080/orders?expedition=${selectedExpedition}&warehouse=${selectedWarehouse}&timeStart=${formattedStartDate}&timeEnd=${formattedEndDate}`;
        const dataForUpdateUrl = `https://formorder.gawebecik.com/orders?expedition=${selectedExpedition}&warehouse=${selectedWarehouse}&timeStart=${formattedStartDate}&timeEnd=${formattedEndDate}`;
        const dataForUpdateResponse = await axios.get(dataForUpdateUrl);
        const dataForUpdate = dataForUpdateResponse.data.data;
        for (const item of dataForUpdate) {
          try {
            // await axios.patch(`http://localhost:8080/orders/${item.id}`, {
            await axios.patch(`https://formorder.gawebecik.com/orders/${item.id}`, {
              isExported: true,
              customerData: {
                custName: item.customerData.custName,
                custWhatsapp: item.customerData.custWhatsapp,
                roCount: item.customerData.roCount,
                district: item.customerData.district,
                regency: item.customerData.regency,
                province: item.customerData.fullAddress,
                fullAddress: item.customerData.fullAddress,
              },
              checkoutData: item.checkoutData,
              deliveryData: {
                expedition: item.deliveryData.expedition,
                warehouse: item.deliveryData.warehouse,
                deliveryFee: item.deliveryData.deliveryFee,
                handlingFee: item.deliveryData.handlingFee,
                deliveryDiscount: item.deliveryData.deliveryDiscount,
              },
              salesData: {
                csName: item.salesData.csName,
                advName: item.salesData.advName,
                sourceAds: item.salesData.sourceAds,
              },
              totalProductCost: item.totalProductCost,
              totalProductDiscount: item.totalProductDiscount,
              totalDeliveryCost: item.totalDeliveryCost,
              totalDeliveryDiscount: item.totalDeliveryDiscount,
              totalPayment: item.totalPayment,
              paymentMethod: item.paymentMethod,
            });
          } catch (error) {
            console.error(`Error updating item ${item.id}:`, error);
          }
        }

        // Tampilkan pesan bahwa data berhasil di-eksport
        this.$swal({
          title: "Data berhasil di-eksport",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error exporting data:", error);
        // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengubah data pada server API
        this.$swal({
          title: "Error exporting data",
          text: "Terjadi kesalahan saat mengubah data pada server API",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },

    handleExportButtonClick() {
      // Panggil fungsi exportData untuk mengubah nilai isExported menjadi true
      this.exportData();
    },

    async handleExportButtonClick() {
      if (
        !this.startDate ||
        !this.endDate ||
        !this.selectedExpedition ||
        !this.selectedWarehouse
      ) {
        this.$swal({
          title: "Harap Lengkapi Data",
          text: "Mohon pilih Start Date, End Date, Expedition, dan Warehouse terlebih dahulu",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      const hasExportedData = this.selected.some((item) => item.isExported);

      if (hasExportedData) {
        this.$swal({
          title: "Beberapa Data Sudah Dieksport!",
          text: "Hanya Mengeksport Data yang Belum Dieksport",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      // Proceed with exporting data for items that are not yet exported
      this.exportData();
    },
  },
  watch: {
    search: _debounce(function (newVal) {
      this.debouncedSearch = newVal;
      this.getDataSearch();
    }, 800),
  },

  mounted() {
    this.getData(0);
    // this.getData(1);
  },
};
</script>

<style scoped>
.card-custom {
  margin: 80px;
}

.custom-text-field {
  width: 100px;
  margin-bottom: 10px;
}

.date-input {
  width: 150px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
