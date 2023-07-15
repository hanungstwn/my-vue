<template>
  <v-card class="p-5">
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
        <ModalForm />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
// import { ref } from "vue";
import moment from "moment";
import ModalForm from "./ModalForm.vue";

export default {
  components: {
    ModalForm,
  },
  data() {
    return {
      search: '',
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
    deleteUser(user) {
      console.log("Delete user:", user);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.custom-text-field {
  width: 100px;
}
</style>
