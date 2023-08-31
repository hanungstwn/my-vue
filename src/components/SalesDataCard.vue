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
      // isExported: true,
      localUsers: {},
    };
  },

  mounted() {
    this.hideSkeleton();
    this.fetchData();
  },

  computed:{
    isExported() {
      return this.users.isExported;
    },
  },

  methods: {
    fetchData() {
      axios
        .get("https://formorder.gawebecik.com/orders/" + this.$route.params.id + "/details")
        // .get("http://localhost:8080/orders/" + this.$route.params.id + "/details")
        .then((response) => {
          this.localUsers = response.data.data;
          this.isLoading = false;
          this.isExported = this.localUsers.isExported;
          this.$emit("users-loaded", this.localUsers);
        })
        .catch((error) => console.log(error));
    },
    updateSalesData() {
      this.$emit("users-updated", this.localUsers);
    },
    hideSkeleton() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
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
