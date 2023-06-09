<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Item</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Name">
        <b-input type="text" v-model="name" placeholder="Add Name here">
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="text" v-model="email" placeholder="Add Email here">
        </b-input>
      </b-field>
      <b-field label="Location">
        <b-input type="text" v-model="location" placeholder="Add Location here">
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="addItem">Save</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ModalView",
  data() {
    return {
      name: "",
      email: "",
      location: "",
    };
  },
  methods: {
    addItem() {
      if (this.name && this.name && this.location) {
        const payload = {
          tourist_name: this.name,
          tourist_email: this.email,
          tourist_location: this.location,
          createdat: Date.now(),
        };
        this.$emit("add-item", payload);
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something's not good, Please provide both Question and Answer`,
          position: "is-bottom",
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style scoped></style>
