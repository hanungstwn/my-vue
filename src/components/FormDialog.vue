<!-- <template v-if="!users.isExported">
  <router-link :to="`/orders/${item.id}/details`" target="_blank">
    <v-btn small icon>
      <v-icon size="x-large" color="primary">mdi-pencil-circle</v-icon>
    </v-btn>
  </router-link>
</template> -->
<template>
  <v-dialog v-model="dialog" persistent max-width="1189px">
    <template v-slot:activator="{ on, attrs }">
      <!-- <v-btn
        v-if="!users.isExported"
        small
        icon
        v-bind="attrs"
        v-on="on"
        @click="editOrder(users)">
        <v-icon size="x-large" color="primary">mdi-pencil-circle</v-icon>
      </v-btn> -->
      <v-btn
        small
        icon
        v-bind="attrs"
        v-on="on"
        @click="editOrder(users)">
        <v-icon size="x-large" color="#ff8000">mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <CustomerDataCard
            :users="detailedit"
            @data-updated="handleDataUpdated" />
          <SalesDataCard
            :users="detailedit"
            @data-updated="handleDataUpdated" />
          <CoDelivTotal :users="detailedit" @data-updated="handleDataUpdated" />
        </v-container>
      </v-card-text>
      <!-- <v-card-text>
          <v-container>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                label="Nama Customer"
                hint="Customer Name"
                outlined
                required
                v-model="users.customerData.custName"></v-text-field>
            </v-col>
          </v-container>
        </v-card-text> -->
      <v-card-actions class="me-6">
        <v-spacer></v-spacer>
        <div v-if="!users.isExported">
          <v-skeleton-loader v-if="isLoading"></v-skeleton-loader>
          <v-btn
            v-else
            depressed
            class="me-4"
            color="error"
            dark
            @click="dialog = false"
            >Cancel</v-btn
          >
          <v-skeleton-loader v-if="isLoading"></v-skeleton-loader>
          <v-btn v-else depressed color="success" @click="updateData">
            Save
          </v-btn>
        </div>
        <div v-else>
          <v-skeleton-loader v-if="isLoading"></v-skeleton-loader>
          <v-btn
            depressed
            class="me-4"
            color="warning"
            dark
            @click="dialog = false"
            >Kembali</v-btn
          >
        </div>
        <!-- <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveAndClose"> Save </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import CustomerDataCard from "./CustomerDataCard.vue";
import SalesDataCard from "./SalesDataCard.vue";
import CoDelivTotal from "./CoDelivTotal.vue";

export default {
  components: {
    CustomerDataCard,
    SalesDataCard,
    CoDelivTotal,
    VueSweetalert2,
  },
  props: {
    users: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      panel: [],
      disabled: false,
      isLoading: true,
      text: "",
      dialog: false,
      detailedit: {},
    };
  },

  mounted() {
    this.hideSkeleton();
  },

  methods: {
    updateData() {
      axios
        .patch(
          "https://formorder.gawebecik.com/orders/" + this.users.id,
          this.users
        )
        // .patch("http://localhost:8080/orders/" + this.users.id, this.users)
        .then((response) => {
          this.$swal({
            title: "Data Berhasil Disimpan",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          console.log(response);
          this.users.isExported = response.data.isExported;
          this.dialog = false;
          // this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.$swal({
            title: "Data Gagal Disimpan, Data Tidak Boleh Kosong",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          this.validation = error.response.data.data;
        });
    },

    editOrder(item) {
      this.dialog = true;
      this.detailedit = item;
    },

    saveAndClose() {
      this.$emit("data-updated", this.localUsers);
      this.dialog = false;
    },

    handleDataUpdated(updatedData) {
      this.detailedit = updatedData;
    },

    closeDialog() {
      this.dialog = false;
    },

    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>
