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
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      :key="id"
      item-key="id"
      show-select
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn small icon @click="openModal(item.id)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <ModalForm ref="modalForm" :id="selectedId" />
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ModalForm from "./ModalForm.vue";

export default {
  components: {
    ModalForm,
  },
  data() {
    return {
      search: "",
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
    // getData() {
    //   const URL = "http://localhost:8080/orders";
    //   axios.get(URL).then((res) => {
    //     this.users = res.data.data;
    //     this.users.forEach((user) => {
    //       user.createdAt = moment(user.createdAt).format("DD MMMM YYYY");
    //     });
    //   });
    // },
    setUsers(data){
      this.users = data;
    },
    openModal(id) {
      this.$refs.modalForm.openModal(id);
    },
  },
  mounted() {
    this.getData();
    axios
    .get("http://localhost:8080/orders")
    .then((response) => this.setUsers(response.data))
    .catch((error) => console.log(error))
  },
};
</script>
