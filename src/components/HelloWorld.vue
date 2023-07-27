<template>
  <v-card class="card-custom">
    <v-card-title class="card-title-custom">
      <v-btn
        dark
        variant="tonal"
        color="#1D6F42"
        class="me-4"
        @click="
          exportData();
          isDataExported();
        "
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
        <v-icon v-if="item.isExported" size="x-large" color="#1B5E20">mdi-file-check</v-icon>
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
        { text: "Alamat", value: "customerData.fullAddress" },
        { text: "Tanggal", value: "createdAtLocal" },
        {
          text: "Ekspedisi",
          value: "deliveryData.expedition",
        },
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
      // console.log("this.users:", this.users);
      // Jika startDate, endDate, atau invalidDates true, kembalikan semua data tanpa penyaringan
      if (!this.startDate || !this.endDate || this.invalidDates) {
        return this.users;
      }

      // Jika ada ekspedisi yang dipilih, saring data berdasarkan ekspedisi
      if (this.selectedExpedition) {
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          // Saring berdasarkan ekspedisi yang dipilih
          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.expedition === this.selectedExpedition
          );
        });
      }

      this.users.forEach((user) => {
        user.isExported = this.isDataExported(user);
      });

      // Jika tidak ada ekspedisi yang dipilih, kembalikan semua data dengan penyaringan tanggal
      return this.users.filter((user) => {
        const itemDate = new Date(user.createdAtLocal);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        return itemDate >= start && itemDate <= end;
      });
    },
  },
  methods: {
    getData() {
      const URL = "http://localhost:8080/orders";
      axios.get(URL).then((res) => {
        this.users = res.data.data;
        this.users.forEach((user, index) => {
          user.no = index + 1;

          // Ubah format UTC menjadi waktu lokal Indonesia (+7 jam)
          const createdAtLocal = moment
            .utc(user.createdAt)
            .utcOffset("+0700")
            .format("DD MMMM YYYY, HH:mm");

          console.log(createdAtLocal);

          // Tambahkan properti baru ke user untuk menyimpan createdAt dalam format waktu lokal
          user.createdAtLocal = createdAtLocal;
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

    exportData() {
      const defaultStartDate = "1970-01-01T00:00";
      const defaultEndDate = moment().format("YYYY-MM-DDTHH:mm");

      // Format start and end dates for the API request
      const formattedStartDate = this.startDate
        ? moment(this.startDate).format("YYYY-MM-DDTHH:mm")
        : defaultStartDate;

      const formattedEndDate = this.endDate
        ? moment(this.endDate).format("YYYY-MM-DDTHH:mm")
        : defaultEndDate;

      // Prepare the selected expedition for the API request
      const selectedExpedition = this.selectedExpedition
        ? this.selectedExpedition
        : "";

      // Check if both start date and end date are set and an expedition is selected before exporting data
      if (!this.startDate || !this.endDate || !selectedExpedition) {
        this.$swal({
          title: "Pilih Tanggal & Ekspedisi !",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return; // Stop the export process if dates and/or expedition are not selected
      }

      const baseURL = "http://localhost:8080/orders/generate";
      const params = {
        timeStart: formattedStartDate,
        timeEnd: formattedEndDate,
        expedition: selectedExpedition,
      };
      const queryString = new URLSearchParams(params).toString();
      const URL = `${baseURL}?${queryString}`;

      axios({
        url: URL,
        method: "GET",
        responseType: "blob",
        headers: {},
      })
        .then((res) => {
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const currentDate = moment().format("YYYY-MM-DD");
          const currentTime = moment().format("HHmmss");
          const fileName = `orders_${currentDate}_${currentTime}.xlsx`;

          const downloadLink = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadLink;
          anchor.download = fileName;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);

          window.URL.revokeObjectURL(downloadLink);
        })
        .catch((error) => {
          this.$swal({
            title: "Error, data gagal dieksport",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          console.error("Error exporting data:", error);
        });
    },

    isDataExported() {
      if (!this.startDate || !this.endDate || this.invalidDates) {
        return;
      }

      const filteredItems = this.filteredItems;
      const updatePromises = [];

      const idsToUpdate = filteredItems.map((item) => item.id);

      // Lakukan permintaan PATCH untuk setiap id
      idsToUpdate.forEach((id) => {
        const itemToUpdate = {
          id,
          isExported: true,
          customerData: {
            custName: filteredItems.find((item) => item.id === id).customerData
              .custName,
            custWhatsapp: filteredItems.find((item) => item.id === id)
              .customerData.custWhatsapp,
            roCount: filteredItems.find((item) => item.id === id).customerData
              .roCount,
            district: filteredItems.find((item) => item.id === id).customerData
              .district,
            regency: filteredItems.find((item) => item.id === id).customerData
              .regency,
            fullAddress: filteredItems.find((item) => item.id === id)
              .customerData.fullAddress,
          },
          checkoutData: filteredItems.find((item) => item.id === id)
            .checkoutData,
          deliveryData: {
            expedition: filteredItems.find((item) => item.id === id)
              .deliveryData.expedition,
            warehouse: filteredItems.find((item) => item.id === id).deliveryData
              .warehouse,
            deliveryFee: filteredItems.find((item) => item.id === id)
              .deliveryData.deliveryFee,
            handlingFee: filteredItems.find((item) => item.id === id)
              .deliveryData.handlingFee,
            deliveryDiscount: filteredItems.find((item) => item.id === id)
              .deliveryData.deliveryDiscount,
          },
          salesData: {
            csName: filteredItems.find((item) => item.id === id).salesData
              .csName,
            advName: filteredItems.find((item) => item.id === id).salesData
              .advName,
            sourceAds: filteredItems.find((item) => item.id === id).salesData
              .sourceAds,
          },
          totalProductCost: filteredItems.find((item) => item.id === id)
            .totalProductCost,
          totalProductDiscount: filteredItems.find((item) => item.id === id)
            .totalProductDiscount,

          totalDeliveryCost: filteredItems.find((item) => item.id === id)
            .totalDeliveryCost,

          totalDeliveryDiscount: filteredItems.find((item) => item.id === id)
            .totalDeliveryDiscount,
          totalPayment: filteredItems.find((item) => item.id === id)
            .totalPayment,

          paymentMethod: filteredItems.find((item) => item.id === id)
            .paymentMethod,
        };

        const promise = axios.patch(
          `http://localhost:8080/orders/${id}`,
          itemToUpdate
        );
        updatePromises.push(promise);
      });

      Promise.all(updatePromises)
        .then((responses) => {
          responses.forEach((response, index) => {
            const id = idsToUpdate[index];
            const updatedItem = filteredItems.find((item) => item.id === id);
            if (updatedItem) {
              updatedItem.isExported = true;
            }
          });
        })
        .catch((error) => {
          console.error("Error updating isExported:", error);
        });
    },

    filterByExpedition() {
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
