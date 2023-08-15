<template>
  <v-form>
    <v-card-text>
      <v-container>
        <v-card class="custom-card">
          <v-skeleton-loader
            type="paragraph"
            v-if="isLoading"></v-skeleton-loader>
          <div v-else>
            <h2 class="text-center mb-10">Customer Data</h2>
            <v-row>
              <!-- Customer Data -->
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Nama Customer"
                  hint="Customer Name"
                  outlined
                  required
                  :disabled="isExported"
                  v-model="users.customerData.custName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  class="custom-field"
                  label="Nomor Whatsapp"
                  hint="Customer Whatsapp Number"
                  outlined
                  required
                  :disabled="isExported"
                  v-model="users.customerData.custWhatsapp"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  class="custom-field"
                  label="Nomor RO"
                  hint="Nomor RO"
                  outlined
                  required
                  disabled
                  v-model="users.customerData.roCount"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Alamat Lengkap"
                  hint="Full Address"
                  outlined
                  required
                  :disabled="isExported"
                  v-model="users.customerData.fullAddress"></v-textarea>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </v-card-text>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerData",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isLoading: true,
      text: "",
      isExported: true,
    };
  },

  mounted() {
    this.hideSkeleton();
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios
        .get(
          "https://formorder.gawebecik.com/orders/" + this.$route.params.id + "/details"
        )
        .then((response) => {
          // console.log("API Response Data:", response.data); // Add this line to see the response data

          this.users = response.data.data;
          this.isLoading = false;

          this.isExported = this.users.isExported;

          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },

    updateCustomerData() {
      this.$emit("users-updated", this.users);
    },

    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>

<style>
.custom-card {
  margin-top: 20px;
  padding: 30px;
}

.button-wrapper {
  /* right: 0; */
  display: flex;
  justify-content: end;
  position: absolute;
  margin: 20px 20px 20px 0;
}
</style>
