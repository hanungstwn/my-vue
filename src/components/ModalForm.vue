<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ on }">
        <v-btn small icon v-on="on" type="button">
          <v-icon color="primary">mdi-pencil</v-icon>
          <v-btn color="red" dark small icon @click="deleteUser(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">History Order</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <h4 class="text-center mb-3">Customer Data</h4>
            <v-row>
              <!-- Customer Data -->
              <v-col cols="12" sm="6" md="6">
                <v-text-field class="custom-field" label="Customer Name" required></v-text-field>
                <v-text-field class="custom-field" label="Whatsapp Number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="District" required></v-text-field>
                <v-text-field label="Regency" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Full Address" required></v-textarea>
              </v-col>
            </v-row>

            <!-- Checkout Data -->
            <h4 class="text-center mt-4 mb-4">Checkout Data</h4>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Product Code"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Product Name"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Quantity"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Weight /Product"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Weight Total"
                  hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Price /Product"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Sum Price"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Discount"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Total Price"
                  hint="example of helper text only on focus"></v-text-field>
                <v-text-field
                  label="Bonus"
                  hint="example of helper text only on focus"></v-text-field>
              </v-col>
            </v-row>

            <!-- Sales Data -->
            <h4 class="text-center mt-4 mb-4">Sales Data</h4>
            <v-row>
              <v-col cols="12" sm="4" md="4"
                ><v-text-field label="CS Name" required></v-text-field
              ></v-col>
              <v-col cols="12" sm="4" md="4"
                ><v-text-field label="ADV Name" required></v-text-field
              ></v-col>
              <v-col cols="12" sm="4" md="4"
                ><v-text-field label="Source AdS" required></v-text-field
              ></v-col>
            </v-row>

            <!-- Total Data -->
            <h4 class="text-center mt-4 mb-4">Total Data</h4>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Total Product Cost"
                  required></v-text-field>
                <v-text-field
                  label="Total Delivery Cost"
                  required></v-text-field>
                <v-text-field label="Total Payment" required></v-text-field>
                <v-text-field label="Courrier Notes" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Total Product Discount"
                  required></v-text-field>
                <v-text-field
                  label="Total Delivery Discount"
                  required></v-text-field>
                <v-text-field label="Payment Method" required></v-text-field>
                <v-text-field label="Tanggal" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="primary" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    users: [],
  }),
  methods: {
    getData() {
      const URL = "http://localhost:8080/orders";
      axios.get(URL).then((res) => {
        this.users = res.data.data;
        this.users.forEach((user) => {
          this.$set(user, "customerName", user.customerData.custName);
          this.$set(user, "whatsappNumber", user.customerData.whatsappNumber);
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

<style lang="css" scoped>
 .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
   border: 1px solid red;
  }

</style>
