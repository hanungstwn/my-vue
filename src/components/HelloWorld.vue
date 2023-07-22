<template>
  <v-card class="card-custom">
    <v-card-title class="card-title-custom">
      <v-btn variant="tonal" color="success" class="me-4" @click="exportData"
        >Export</v-btn
      >
      <DateStart v-model="startDate" @change="invalidDates" />
      <DateEnd v-model="endDate" @change="invalidDates" />
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
      show-select
      class="elevation-1">
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
import DateStart from "./DateStart.vue";
import DateEnd from "./DateEnd.vue";

export default {
  name: "HelloWorld",
  props: ["orders"],
  components: {
    DateStart,
    DateEnd,
  },
  data() {
    return {
      search: "",
      startDate: "",
      endDate: "",
      dialog: false,
      selected: [],
      headers: [
        {
          text: "Nama Customer",
          align: "start",
          sortable: false,
          value: "customerData.custName",
        },
        { text: "Alamat", value: "customerData.fullAddress" },
        { text: "Dibuat Pada", value: "createdAt" },
        // { text: "Diperbarui Pada", value: "updatedAt" },
        { text: "Action", value: "actions" },
      ],
      users: [],
      invalidDates: false,
    };
  },
  computed: {
    filteredItems() {
      // Jika startDate atau endDate kosong atau invalidDates true, kembalikan semua data tanpa penyaringan
      if (!this.startDate || !this.endDate || this.invalidDates) {
        return this.users;
      }

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
        this.users.forEach((user) => {
          user.createdAt = moment(user.createdAt).format("DD MMMM YYYY");
          user.updatedAt = moment(user.updatedAt).format("DD MMMM YYYY");
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
      // Set default start and end dates if they are not selected
      const defaultStartDate = "1970-01-01T00:00";
      const defaultEndDate = moment().format("YYYY-MM-DDTHH:mm");

      // Use the selected dates if available, otherwise use default dates
      const formattedStartDate = this.startDate
        ? moment(this.startDate).format("YYYY-MM-DDTHH:mm")
        : defaultStartDate;

      const formattedEndDate = this.endDate
        ? moment(this.endDate).format("YYYY-MM-DDTHH:mm")
        : defaultEndDate;

      const URL = "http://localhost:8080/orders/generate";
      const params = {
        timeStart: formattedStartDate,
        timeEnd: formattedEndDate,
      };

      axios({
        url: URL,
        method: "GET",
        responseType: "blob",
        params, // Pass the startDate and endDate as query parameters
        headers: {
          // You may add the Authorization header here if required by the API
          // "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        },
      })
        .then((res) => {
          var FILE = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("a");
          docUrl.href = FILE;
          docUrl.setAttribute("download", "file.xlsx");
          document.body.appendChild(docUrl);
          docUrl.click();
        })
        .catch((error) => {
          // Handle any error that might occur during the export process
          console.error("Error exporting data:", error);
        });
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
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
