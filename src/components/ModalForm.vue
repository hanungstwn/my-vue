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
            <v-row>
              <!-- Customer Data -->
              <v-col cols="12" sm="6" md="6">
                <h5>Customer Data</h5>
                <v-text-field
                  label="Customer Name"
                  variant="outlined"
                  required></v-text-field>
                <v-text-field label="Whatsapp Number" required></v-text-field>
                <v-text-field label="District" required></v-text-field>
                <v-text-field label="Regency" required></v-text-field>
                <v-textarea label="Full Address" required></v-textarea>
                <!-- Sales Data -->
                <h5 class="mt-3">Sales Data</h5>
                <v-text-field label="CS Name" required></v-text-field>
                <v-text-field label="ADV Name" required></v-text-field>
                <v-text-field label="Source Ads" required></v-text-field>
              </v-col>
              <!-- Checkout Data -->
              <v-col cols="12" sm="6" md="6">
                <h5>Checkout Data</h5>
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
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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

<style lang="scss" scoped>
$v-text-field-border-radius: 10px;

.v-text-field {
  &--outlined {
    border-radius: $v-text-field-border-radius;
    border: 1px solid black;
  }
}
</style>
