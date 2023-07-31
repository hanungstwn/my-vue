import { defineStore } from 'pinia';

export const useDeliveryDataStore = defineStore('deliveryData', {
  state: () => ({
    users: null,
  }),
  actions: {
    setUsers(users) {
      this.users = users;
    },
  },
  getters: {
    totalDeliveryCost() {
      const deliveryData = this.users && this.users.deliveryData;
      if (!deliveryData) return null;

      return deliveryData.deliveryFee - deliveryData.deliveryDiscount + deliveryData.handlingFee;
    },
  },
});
