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
      <template v-slot:item.actions="{ item }">
        <router-link :to="`/orders/${item.id}/details`">
          <v-btn small icon>
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>

      <template v-slot:item.isValidOrder="{ item }">
        <v-chip v-if="item.isValidOrder" color="success"> Benar </v-chip>
        <v-chip v-else color="error"> Salah </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "HelloWorld",
  props: ["orders"],
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
          expedition: "j&t",
          exid: "opt1",
        },
        {
          expedition: "ninja",
          exid: "opt2",
        },
        {
          expedition: "sicepat",
          exid: "opt3",
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
      console.log("this.users:", this.users);
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
        params,
        headers: {},
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
