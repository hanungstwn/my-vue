<template>
  <v-form>
    <v-card-text>
      <v-container>
        <template>
          <!-- Delivery Data -->
          <v-card class="custom-card">
            <v-skeleton-loader
              type="paragraph"
              v-if="isLoading"></v-skeleton-loader>
            <div v-else>
              <h2 class="text-center mt-4 mb-10">Delivery Data</h2>
              <v-row>
                <v-col cols="12" sm="6" md="6"
                  ><v-text-field
                    label="Nama Ekspedisi"
                    v-model="users.deliveryData.expedition"
                    outlined
                    disabled
                    required></v-text-field
                ></v-col>
                <v-col cols="12" sm="6" md="6"
                  ><v-text-field label="Gudang" v-model="users.deliveryData.warehouse" outlined disabled required></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Ongkos Kirim"
                    v-model="users.deliveryData.deliveryFee"
                    outlined
                    required
                    disabled></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Biaya Penanganan"
                    v-model="users.deliveryData.handlingFee"
                    outlined
                    required
                    disabled></v-text-field
                ></v-col>
                <v-col cols="12" sm="4" md="4"
                  ><v-text-field
                    label="Diskon Ongkir"
                    v-model="users.deliveryData.deliveryDiscount"
                    outlined
                    required></v-text-field
                ></v-col>
              </v-row>
            </div>
          </v-card>
        </template>
      </v-container>
    </v-card-text>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "DeliveryData",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isLoading: true,
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
          "http://localhost:8080/orders/" + this.$route.params.id + "/details"
        )
        .then((response) => {
          console.log("API Response Data:", response.data); // Add this line to see the response data

          this.users = response.data.data;
          this.isLoading = false;

          // Emit the event with the loaded users data
          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },
    updateDeliveryData() {
      // Your logic to update the delivery data
      // For example, you can update the 'users.deliveryData' object
      // ...

      // Emit an event to inform the parent (FormView.vue) about the data update
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
