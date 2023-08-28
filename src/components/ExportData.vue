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
              variant="underlined"
              @change="filterByExpedition"></v-select>
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
              variant="underlined"
              @change="filterByExpedition"></v-select>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="success" text @click="dialog = false"> Export </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      startDate: null,
      endDate: null,
      selectedExpedition: null,
      selectedWarehouse: null,
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
    };
  },

  computed: {
    filteredItems() {
      // If startDate, endDate, or invalidDates is true, return all data without filtering
      if (!this.startDate || !this.endDate || this.invalidDates) {
        return this.users;
      }

      // Apply filters based on selectedExpedition and selectedWarehouse (if selected)
      if (this.selectedExpedition && this.selectedWarehouse) {
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          // Filter based on both selectedExpedition and selectedWarehouse
          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.expedition === this.selectedExpedition &&
            user.deliveryData.warehouse === this.selectedWarehouse
          );
        });
      } else if (this.selectedExpedition) {
        // Filter based on only selectedExpedition
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.expedition === this.selectedExpedition
          );
        });
      } else if (this.selectedWarehouse) {
        // Filter based on only selectedWarehouse
        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);

          return (
            itemDate >= start &&
            itemDate <= end &&
            user.deliveryData.warehouse === this.selectedWarehouse
          );
        });
      } else {
        // If no expedition or warehouse selected, apply only date filter
        this.users.forEach((user) => {
          user.isExported = this.isDataExported(user);
        });

        return this.users.filter((user) => {
          const itemDate = new Date(user.createdAtLocal);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          return itemDate >= start && itemDate <= end;
        });
      }
    },

    methods: {
      async exportData() {
        const filteredData = this.filteredItems;

        if (filteredData.length === 0) {
          // Tampilkan pesan jika tidak ada data yang sesuai dengan filter
          this.$swal({
            title: "Tidak ada data yang sesuai dengan filter",
            icon: "warning",
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        try {
          //format waktu GMT
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
          // const baseURL = "https://formorder.gawebecik.com/orders/generate";
          const baseURL = "http://localhost:8080/orders/generate";
          const URL = `${baseURL}?${queryString}`;
          const res = await axios({
            url: URL,
            method: "GET",
            responseType: "blob",
            headers: {},
          });

          // Data is downloaded successfully, now update the isExported propertyzzzzzz
          await Promise.all(
            filteredData.map(async (item) => {
              const id = item.id;
              // await axios.patch(`https://formorder.gawebecik.com/orders/${id}`, {
              await axios.patch(`http://localhost:8080/orders/${id}`, {
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
            })
          );

          // Tampilkan pesan bahwa data berhasil di-eksport
          this.$swal({
            title: "Data berhasil di-eksport",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          // Update data yang ditampilkan di tabel dengan data terbaru setelah isExported diubah menjadi true
          this.getData();

          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const downloadLink = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadLink;
          const filename = `orders_${selectedExpedition}_${selectedWarehouse}_${moment().format(
            "YYYY-MM-DD_HHmmss"
          )}`;
          anchor.download = `${filename}.xlsx`;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          // Clean up
          window.URL.revokeObjectURL(downloadLink);
        } catch (error) {
          console.error("Error exporting data:", error);
          // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengubah data pada server API
          this.$swal({
            title: "Error exporting data",
            text: "Terjadi kesalahan saat mengubah data pada server API",
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

      filterByExpedition() {
        this.validateDates();
      },

      filterByWarehouse() {
        // this.exportData();
        this.validateDates();
      },
    },
    watch: {
      startDate() {
        this.validateDates();
      },
      endDate() {
        this.validateDates();
      },
    },
  },
};
</script>
<style lang=""></style>
