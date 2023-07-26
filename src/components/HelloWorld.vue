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

      <template v-slot:item.actions="{ item }">
        <!-- Check if the data is exported and update the action buttons accordingly -->
        <!-- <v-icon v-if="item.isDataExported" color="success"
          >mdi-checkbox-marked-circle</v-icon
        > -->
        <router-link :to="`/orders/${item.id}/details`">
          <v-btn small icon>
            <v-icon size="x-large" color="warning">mdi-pencil-circle</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="`/orders/${item.id}`">
          <v-btn small icon @click="confirmDeleteData(item)">
            <v-icon size="x-large" color="error">mdi-close-circle</v-icon>
          </v-btn>
        </router-link>
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
        { text: "Action", value: "actions" },
        { text: "Export", value: "isExported" },
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

      // this.users.forEach((user) => {
      //   user.isExported = this.isDataExported(user);
      // });

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
          // this.updateDataExportStatus(this.filteredItems);
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

  //   updateDataExportStatus(itemsToUpdate) {
  //   // Buat array yang berisi id dari item yang akan diubah
  //   const idsToUpdate = itemsToUpdate.map((item) => item.id);

  //   // Lakukan permintaan PATCH untuk setiap id
  //   const updatePromises = idsToUpdate.map((id) => {
  //     return axios.patch(`http://localhost:8080/orders/${id}`, {
  //       isExported: true,
  //       // Jika ada field lain yang perlu diperbarui, tambahkan di sini
  //     });
  //   });

  //   // Tunggu semua permintaan selesai
  //   Promise.all(updatePromises)
  //     .then((responses) => {
  //       // Proses hasil dari permintaan PATCH jika diperlukan
  //       responses.forEach((response, index) => {
  //         const id = idsToUpdate[index];
  //         const updatedItem = itemsToUpdate.find((item) => item.id === id);
  //         if (updatedItem) {
  //           updatedItem.isExported = true; // Ubah nilai isExported menjadi true
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating isExported:", error);
  //       // Cetak pesan kesalahan dari server
  //       if (error.response && error.response.data) {
  //         console.error("Server response:", error.response.data);
  //       }
  //     });
  // },

    filterByExpedition() {
      this.validateDates(); // Pastikan tanggal yang dipilih masih valid
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
