<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {{ item.id }}</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Name">
        <b-input type="text" v-model="name" placeholder="Edit Name here">
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="text" v-model="email" placeholder="Edit Email here">
        </b-input>
      </b-field>
      <b-field label="Location">
        <b-input
          type="text"
          v-model="location"
          placeholder="Edit Location here"
        >
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="editItem">Save</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "EditModalView",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      email: "",
      location: "",
    };
  },
  mounted() {
    this.name = this.item.tourist_name;
    this.email = this.item.tourist_email;
    this.location = this.item.tourist_location;
  },
  methods: {
    editItem() {
      if (this.name && this.email && this.location) {
        const payload = {
          id: this.item.id,
          tourist_name: this.name,
          tourist_email: this.email,
          tourist_location: this.location,
        };
        this.$emit("edit-item", payload);
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
