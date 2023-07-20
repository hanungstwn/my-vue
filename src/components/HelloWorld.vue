<template>
  <v-card class="card-custom">
    <v-card-title>
      <v-btn variant="tonal" color="success">Export</v-btn>
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

export default {
  name: "HelloWorld",
  props: ["orders"],
  data() {
    return {
      search: "",
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
        { text: "Tanggal", value: "createdAt" },
        { text: "Action", value: "actions" },
      ],
      users: [],
    };
  },
  methods: {
    getData() {
      const URL = "http://localhost:8080/orders";
      axios.get(URL).then((res) => {
        this.users = res.data.data;
        this.users.forEach((user) => {
          user.createdAt = moment(user.createdAt).format("DD MMMM YYYY");
        });
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
}
</style>
