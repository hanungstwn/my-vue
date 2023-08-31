<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#1D6F42" class="me-4" dark v-bind="attrs" v-on="on">
          Export
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 success lighten-2">
          Export Data
        </v-card-title>

        <v-card-text>
          <div class="date-input">
            <v-datetime-picker
              label="Start Date"
              v-model="startDate"
              class="date-input">
              <template slot="dateIcon">
                <v-icon>mdi-calendar</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>mdi-clock-outline</v-icon>
              </template></v-datetime-picker
            >
          </div>
          <div class="date-input">
            <v-datetime-picker
              label="End Date"
              v-model="endDate"
              class="date-input">
              <template slot="dateIcon">
                <v-icon>mdi-calendar</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>mdi-clock-outline</v-icon>
              </template></v-datetime-picker
            >
          </div>
          <div class="date-input">
            <v-select
              clearable
              v-model="selectedExpedition"
              label="Expedition"
              :items="expeditions"
              class="custom-select-field"
              item-text="expedition"
              item-value="exid"
              variant="underlined"></v-select>
          </div>
          <div class="date-input">
            <v-select
              clearable
              v-model="selectedWarehouse"
              label="Warehouse"
              :items="warehouse"
              class="custom-select-field"
              item-text="warehouse"
              item-value="exid"
              variant="underlined"></v-select>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="success" text @click="handleExportButtonClick">
            Export
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      dialog: false,
      startDate: null,
      endDate: null,
      selectedExpedition: null,
      selectedWarehouse: null,
      filteredItems: [],
      expeditions: [
        {
          expedition: "Jnt",
          exid: "jnt",
        },
        {
          expedition: "Ninja",
          exid: "ninja",
        },
        {
          expedition: "SiCepat",
          exid: "sicepat",
        },
      ],
      warehouse: [
        {
          warehouse: "Kosambi",
          exid: "kosambi",
        },
        {
          warehouse: "Tandes",
          exid: "tandes",
        },
        {
          warehouse: "Cilacap",
          exid: "cilacap",
        },
      ],
      users: [],
    };
  },

  created() {
    // Fetch users from API and assign to this.users
    this.fetchUsers();
  },

  computed: {
    serverItems() {
      const startIndex = this.currentPage * this.itemsPerPage + 1;
      const endIndex = startIndex + this.itemsPerPage;

      return this.filteredItems.slice(startIndex, endIndex + 1);
    },
  },

  methods: {
    async exportData() {
      try {
        // Format waktu GMT
        const formattedStartDate = this.startDate
          ? moment(this.startDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";
        const formattedEndDate = this.endDate
          ? moment(this.endDate).utc().format("YYYY-MM-DDTHH:mm")
          : "";

        const selectedExpedition = this.selectedExpedition
          ? this.selectedExpedition
          : "";
        const selectedWarehouse = this.selectedWarehouse
          ? this.selectedWarehouse
          : "";

        const params = {
          expedition: selectedExpedition,
          warehouse: selectedWarehouse,
          timeStart: formattedStartDate,
          timeEnd: formattedEndDate,
        };

        const queryString = new URLSearchParams(params).toString();
        // const baseURL = "http://localhost:8080/orders/generate";
        const baseURL = "https://formorder.gawebecik.com/orders/generate";
        const URL = `${baseURL}?${queryString}`;
        const res = await axios({
          url: URL,
          method: "GET",
          responseType: "blob",
          headers: {},
        });

        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadLink = window.URL.createObjectURL(blob);
        const filename = `orders_${selectedExpedition}_${selectedWarehouse}_${moment().format(
          "YYYY-MM-DD_HHmmss"
        )}`;
        const anchor = document.createElement("a");
        anchor.href = downloadLink;
        anchor.download = `${filename}.xlsx`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(downloadLink);

        // Membuat array id di looping terus nilai yang ada dalam array dipassing ke request patch berdasarkan id dalam array
        // Fetch the data for updating isExported
        // const dataForUpdateUrl = `http://localhost:8080/orders?expedition=${selectedExpedition}&warehouse=${selectedWarehouse}&timeStart=${formattedStartDate}&timeEnd=${formattedEndDate}`;
        const dataForUpdateUrl = `https://formorder.gawebecik.com/orders?expedition=${selectedExpedition}&warehouse=${selectedWarehouse}&timeStart=${formattedStartDate}&timeEnd=${formattedEndDate}`;
        const dataForUpdateResponse = await axios.get(dataForUpdateUrl);
        const dataForUpdate = dataForUpdateResponse.data.data;
        for (const item of dataForUpdate) {
          try {
            // await axios.patch(`http://localhost:8080/orders/${item.id}`, {
            await axios.patch(`https://formorder.gawebecik.com/orders/${item.id}`, {
              isExported: true,
              customerData: {
                custName: item.customerData.custName,
                custWhatsapp: item.customerData.custWhatsapp,
                roCount: item.customerData.roCount,
                district: item.customerData.district,
                regency: item.customerData.regency,
                province: item.customerData.fullAddress,
                fullAddress: item.customerData.fullAddress,
              },
              checkoutData: item.checkoutData,
              deliveryData: {
                expedition: item.deliveryData.expedition,
                warehouse: item.deliveryData.warehouse,
                deliveryFee: item.deliveryData.deliveryFee,
                handlingFee: item.deliveryData.handlingFee,
                deliveryDiscount: item.deliveryData.deliveryDiscount,
              },
              salesData: {
                csName: item.salesData.csName,
                advName: item.salesData.advName,
                sourceAds: item.salesData.sourceAds,
              },
              totalProductCost: item.totalProductCost,
              totalProductDiscount: item.totalProductDiscount,
              totalDeliveryCost: item.totalDeliveryCost,
              totalDeliveryDiscount: item.totalDeliveryDiscount,
              totalPayment: item.totalPayment,
              paymentMethod: item.paymentMethod,
            });
          } catch (error) {
            console.error(`Error updating item ${item.id}:`, error);
          }
        }

        // Tampilkan pesan bahwa data berhasil di-eksport
        this.$swal({
          title: "Data berhasil di-eksport",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error exporting data:", error);
        // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengubah data pada server API
        this.$swal({
          title: "Error exporting data",
          text: "Data Sudah Di Eksport",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },

    handleExportButtonClick() {
      // Panggil fungsi exportData untuk mengubah nilai isExported menjadi true
      this.exportData();
    },

    async handleExportButtonClick() {
      if (
        !this.startDate ||
        !this.endDate ||
        !this.selectedExpedition ||
        !this.selectedWarehouse
      ) {
        this.$swal({
          title: "Harap Lengkapi Data",
          text: "Mohon pilih Start Date, End Date, Expedition, dan Warehouse terlebih dahulu",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      // const hasExportedData = this.selected.some((item) => item.isExported);

      // if (hasExportedData) {
      //   this.$swal({
      //     title: "Beberapa Data Sudah Dieksport!",
      //     text: "Hanya Mengeksport Data yang Belum Dieksport",
      //     icon: "error",
      //     timer: 2000,
      //     showConfirmButton: false,
      //   });
      //   return;
      // }

      // Proceed with exporting data for items that are not yet exported
      this.exportData();
    },
  },
};
</script>
