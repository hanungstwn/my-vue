<template>
  <div>
    <div
      class="moda fade"
      tabindex="-1"
      :id="'showOrderDetails' + item.id"
      :aria-labelledby="item.id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              <h5>{{item.customerData.name}}</h5>
              <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalForm",
  props: {
    Data: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    getData() {
      const URL = "http://localhost:8080/orders";
      axios.get(URL).then((res) => {
        this.users = res.data.data;
        this.users.forEach((user) => {
          user.createdAt = moment(user.createdAt).format("DD MMMM YYYY");
        });
      });
    },
    openModal() {
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
    },
    saveData() {
      // Logic to save data
      console.log("Saving data:", this.Data);
    },
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
