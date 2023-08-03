<template>
  <v-card class="card-custom">
    <v-card-title class="card-title-custom">
      <v-btn
        dark
        variant="tonal"
        color="#1D6F42"
        class="me-4"
        @click="handleExportButtonClick"
        >Export</v-btn
      >
      <div class="date-input">
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
          variant="underlined"
          @change="filterByExpedition"></v-select>
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
          variant="underlined"
          @change="filterByExpedition"></v-select>
      </div>
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
      :items="filteredItems"
      :search="search"
      item-key="id"
      class="elevation-1">
      <!-- <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt }}
      </template> -->

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
        <!-- Check if the data is exported and update the action buttons accordingly -->
        <v-icon v-if="item.isExported" color="success"
          >mdi-checkbox-marked-circle</v-icon
        >
        <template v-else>
          <router-link :to="`/orders/${item.id}/details`">
            <v-btn small icon>
              <v-icon size="x-large" color="warning">mdi-pencil-circle</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="`/orders/${item.id}`">
            <v-btn small icon @click="confirmDeleteData(item)">
              <v-icon size="x-large" color="error">mdi-delete-circle</v-icon>
            </v-btn>
          </router-link>
        </template>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";

export default {
  name: "HelloWorld",
  props: ["orders"],
  components: {
    VueSweetalert2,
  },
  data() {
    return {
      search: "",
      startDate: null,
      endDate: null,
      dialog: false,
      selectedExpedition: null,
      selectedWarehouse: null,
      custName: "",
      selected: [],
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
        // { text: "Alamat", value: "customerData.fullAddress" },
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
    filteredItems() {
      // If startDate, endDate, or invalidDates is true, return all data without filtering
      if (!this.startDate || !this.endDate || this.invalidDates) {
        return this.users;
      }

      // Apply filters based on selectedExpedition and selectedWarehouse (if selected)
      if (this.selectedExpedition && this.selectedWarehouse) {
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          // Filter based on both selectedExpedition and selectedWarehouse
          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.expedition === this.selectedExpedition &&
            user.deliveryData.warehouse === this.selectedWarehouse
          );
        });
      } else if (this.selectedExpedition) {
        // Filter based on only selectedExpedition
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.expedition === this.selectedExpedition
          );
        });
      } else if (this.selectedWarehouse) {
        // Filter based on only selectedWarehouse
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.warehouse === this.selectedWarehouse
          );
        });
      } else {
        // If no expedition or warehouse selected, apply only date filter
        this.users.forEach((user) => {
          user.isExported = this.isDataExported(user);
        });

        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          return itemDate >= start && itemDate <= end;
        });
      }
    },
  },
  methods: {
    getData() {
      const URL = "http://localhost:8080/orders";
      this.users = [];
      axios
        .get(URL)
        .then((res) => {
          // console.log("Response Data:", res.data); // Log the response data to check its structure

          if (!res.data || !res.data.data || res.data.data.length === 0) {
            // Tampilkan pesan kesalahan jika tidak ada data yang diterima dari server API
            console.log("No data received.");
            // Atau tampilkan pesan kesalahan menggunakan swal
            this.$swal({
              title: "Tidak ada data yang ditemukan",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
            return;
          }

          this.users = res.data.data;
          this.users.forEach((user, index) => {
            user.no = index + 1;

            // Ubah format UTC menjadi waktu lokal Indonesia (+7 jam)
            const createdAtLocal = moment
              .utc(user.createdAt)
              .utcOffset("+0700")
              .format("DD MMMM YYYY, HH:mm");

            // console.log(createdAtLocal);

            // Tambahkan properti baru ke user untuk menyimpan createdAt dalam format waktu lokal
            user.createdAtLocal = createdAtLocal;
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengambil data dari server API
          this.$swal({
            title: "Error fetching data",
            text: "Terjadi kesalahan saat mengambil data dari server API",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        });
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
        .delete(`http://localhost:8080/orders/${user.id}`)
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

    validateDates() {
      this.invalidDates = false;
      if (this.startDate && this.endDate) {
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        if (startDate > endDate) {
          this.invalidDates = true;
        }
      }
    },

    async exportData() {
      const filteredData = this.filteredItems;

      if (filteredData.length === 0) {
        // Tampilkan pesan jika tidak ada data yang sesuai dengan filter
        this.$swal({
          title: "Tidak ada data yang sesuai dengan filter",
          icon: "warning",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      try {
        //format waktu GMT
        const formattedStartDate = this.startDate
          ? moment(this.startDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";
        const formattedEndDate = this.endDate
          ? moment(this.endDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";

        // format waktu indonesia
        // const formattedStartDate = this.startDate
        //   ? moment(this.startDate).format("YYYY-MM-DDTHH:mm")
        //   : "";
        // const formattedEndDate = this.endDate
        //   ? moment(this.endDate).format("YYYY-MM-DDTHH:mm")
        //   : "";

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
        const baseURL = "http://localhost:8080/orders/generate";
        const URL = `${baseURL}?${queryString}`;
        const res = await axios({
          url: URL,
          method: "GET",
          responseType: "blob",
          headers: {},
        });

        // Data is downloaded successfully, now update the isExported property
        await Promise.all(
          filteredData.map(async (item) => {
            const id = item.id;
            await axios.patch(`http://localhost:8080/orders/${id}`, {
              // ... (your existing data properties)
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
          })
        );

        // Tampilkan pesan bahwa data berhasil di-eksport
        this.$swal({
          title: "Data berhasil di-eksport",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Update data yang ditampilkan di tabel dengan data terbaru setelah isExported diubah menjadi true
        this.getData();

        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadLink = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = downloadLink;
        const filename = `orders_${selectedExpedition}_${selectedWarehouse}_${moment().format(
          "YYYY-MM-DD_HHmmss"
        )}`;
        anchor.download = `${filename}.xlsx`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        // Clean up
        window.URL.revokeObjectURL(downloadLink);
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

    filterByExpedition() {
      this.validateDates();
    },

    filterByWarehouse() {
      // this.exportData();
      this.validateDates();
    },
  },
  watch: {
    startDate() {
      this.validateDates();
    },
    endDate() {
      this.validateDates();
    },
  },

  mounted() {
    this.getData();
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
