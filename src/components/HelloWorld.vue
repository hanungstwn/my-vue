<template>
  <v-card class="card-custom">
    <v-card-title class="card-title-custom">
      <v-btn variant="tonal" color="success" class="me-4" @click="exportData"
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
      <template v-slot:item.createdAtLocal="{ item }">
        {{ item.createdAtLocal }}
      </template>

      <template v-slot:item.isValidOrder="{ item }">
        <v-chip v-if="item.isValidOrder" color="success"> Benar </v-chip>
        <v-chip v-else color="error"> Salah </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link :to="`/orders/${item.id}/details`">
          <v-btn small icon>
            <v-icon color="primary">mdi-pencil</v-icon>
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
          expedition: "J&t",
          exid: "j&t",
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
          const itemDate = new Date(user.createdAt);
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

      // Jika tidak ada ekspedisi yang dipilih, kembalikan semua data dengan penyaringan tanggal
      return this.users.filter((user) => {
        const itemDate = new Date(user.createdAt);
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
          // Konversi createdAt ke zona waktu lokal Indonesia (WIB) dan format yang diinginkan
          user.createdAtLocal = moment(user.createdAt)
            .utcOffset("+0700")
            .format("DD MMMM YYYY, HH:mm"); // Format tanggal-bulan-tahun dan jam

          user.createdAt = moment(user.createdAt)
            .utcOffset("+0700")
            .toDate()
            .toISOString();

          // Konversi updatedAt ke zona waktu lokal Indonesia (WIB) dan format yang diinginkan
          user.updatedAtLocal = moment(user.updatedAt)
            .utcOffset("+0700")
            .format("DD MMMM YYYY, HH:mm"); // Format tanggal-bulan-tahun dan jam

          user.updatedAt = moment(user.updatedAt)
            .utcOffset("+0700")
            .toDate()
            .toISOString();

          // console.log(user.createdAtLocal, user.updatedAtLocal);
        });
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

      // Create the URL with the necessary query parameters
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
          // Create a download link and trigger the click event to start downloading the file
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const downloadLink = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadLink;
          anchor.download = "file.xlsx";
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);

          // Clean up
          window.URL.revokeObjectURL(downloadLink);
        })
        .catch((error) => {
          this.$swal({
            title: "Ekspedisi Belum Dipilih!",
            icon: "error",
            timer: 1500, // Set the time (in milliseconds) for the dialog to close automatically
            showConfirmButton: false, // Hide the "OK" button
          });
          console.error("Error exporting data:", error);
        });
    },

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
