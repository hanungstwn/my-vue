<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Start Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        class="custom-text-field"
        v-on="on"
        @click="menu = !menu"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      color="orange"
      no-title
      scrollable
      @input="$emit('input', date)"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateEnd",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      menu: false,
      date: this.value,
    };
  },
};
</script>

<style>
.custom-text-field {
  width: 50px;
  margin-top: 16px;
  margin-left: 20px;
}
</style>
