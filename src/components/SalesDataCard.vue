<template>
  <v-form>
    <v-card-text>
      <v-container>
        <v-card class="custom-card">
          <v-skeleton-loader
            type="paragraph"
            v-if="isLoading"></v-skeleton-loader>
          <div v-else>
            <h2 class="text-center mt-4 mb-10">Sales Data</h2>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Nama CS"
                  v-model="users.salesData.csName"
                  @change="updateSalesData"
                  outlined
                  :disabled="isExported"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Nama ADV"
                  v-model="users.salesData.advName"
                  @change="updateSalesData"
                  outlined
                  :disabled="isExported"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Sumber Iklan"
                  v-model="users.salesData.sourceAds"
                  @change="updateSalesData"
                  outlined
                  :disabled="isExported"
                  required></v-text-field>
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
  name: "SalesData",

  props: {
    users: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isLoading: true,
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
          // console.log("API Response Data:", response.data);
          this.users = response.data.data;
          this.isLoading = false;

          this.isExported = this.users.isExported;

          this.$emit("users-loaded", this.users);
        })
        .catch((error) => console.log(error));
    },
    updateSalesData() {
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
