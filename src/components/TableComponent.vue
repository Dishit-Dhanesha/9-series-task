<template>
  <div>
    <b-button class="is-primary" @click="isAddModalActive = true">
      Add an Tourist
    </b-button>
    <section class="section">
      <div class="container">
        <b-table :bordered="true" :data="items" default-sort="priority">
          <b-table-column v-slot="props" label="ID" width="40" sortable numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column v-slot="props" label="Name" sortable>
            {{ props.row.tourist_name }}
          </b-table-column>

          <b-table-column v-slot="props" label="Email" sortable>
            {{ props.row.tourist_email }}
          </b-table-column>
          <b-table-column v-slot="props" label="Location" sortable>
            {{ props.row.tourist_location }}
          </b-table-column>
          <b-table-column v-slot="props" label="Created At" sortable>
            {{ props.row.createdat | moment("Do MMM  YY") }}
          </b-table-column>

          <b-table-column v-slot="props" label="Edit">
            <b-button
              type="is-text"
              icon-left="pencil"
              @click="openEditModal(props.row)"
            ></b-button>
          </b-table-column>

          <b-table-column v-slot="props" label="Delete">
            <b-button
              type="is-text"
              icon-left="delete"
              @click="deleteItem(props.row)"
            ></b-button>
          </b-table-column>
        </b-table>

        <b-modal :active.sync="isEditModalActive" has-modal-card>
          <edit-item-component
            :item="selectedItem"
            @edit-item="onEditItem"
          ></edit-item-component>
        </b-modal>

        <b-modal :active.sync="isAddModalActive" has-modal-card>
          <add-item-component @add-item="onAddItem"></add-item-component>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditItemComponent from "@/components/EditItemComponent";
import AddItemComponent from "@/components/AddItemComponent";
export default {
  data() {
    return {
      items: [],
      selectedItem: {},
      isEditModalActive: false,
      isAddModalActive: false,
    };
  },
  components: {
    EditItemComponent,
    AddItemComponent,
  },
  async mounted() {
    if (localStorage.getItem("items")) {
      this.items = JSON.parse(localStorage.getItem("items"));
    } else {
      this.items = await this.load();
    }
  },

  methods: {
    ...mapActions(["load"]),

    openEditModal(item) {
      this.selectedItem = item;
      this.isEditModalActive = true;
    },

    onAddItem(item) {
      // get the highest number id to iterate on it
      const highestId = Math.max.apply(
        Math,
        this.items.map((item) => item.id)
      );
      // Add the item to the array
      this.items.push({
        id: highestId + 1,
        tourist_name: item.tourist_name,
        tourist_email: item.tourist_email,
        tourist_location: item.tourist_location,
        createdat: item.createdat,
      });
      // save the updated array in localstorage
      this.saveLocalStorageItem();
      this.isAddModalActive = false;
    },
    onEditItem(fetchedItem) {
      const item = this.findItem(fetchedItem);
      // Apply the updated values
      item.tourist_name = fetchedItem.tourist_name;
      item.tourist_location = fetchedItem.tourist_location;
      item.tourist_email = fetchedItem.tourist_email;
      // save the updated array in localstorage
      this.saveLocalStorageItem();
      // close the modal
      this.isEditModalActive = false;
    },
    deleteItem(item) {
      this.$buefy.dialog.confirm({
        title: `Deleting FAQ`,
        confirmText: "Delete FAQ",
        type: "is-danger",
        hasIcon: true,
        message: `Are you sure you want to delete this item? This cannot be undone.`,
        onConfirm: () => {
          // find in the array and remove
          const index = this.items.indexOf(item);
          this.items.splice(index, 1);
          // save the updated array in localstorage
          this.saveLocalStorageItem();
        },
      });
    },
    findItem(tourist) {
      return this.items.find((item) => item.id === tourist.id);
    },
    saveLocalStorageItem() {
      localStorage.setItem("items", JSON.stringify(this.items));
      this.items = JSON.parse(localStorage.getItem("items"));
    },
  },
};
</script>
