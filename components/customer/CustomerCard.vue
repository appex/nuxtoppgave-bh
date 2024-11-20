<script setup lang="ts">
import type { Customer } from "~/types/customer";

const props = defineProps<{
  customer: Customer;
}>();

const emit = defineEmits<{
  "update:notes": [organizationNumber: string, notes: string];
  delete: [organizationNumber: string];
}>();

const handleDeleteCustomer = () => {
  emit("delete", props.customer.organizationNumber);
};
</script>

<template>
  <div class="window" style="width: 100%">
    <div class="title-bar">
      <div class="title-bar-text">{{ customer.name }}</div>
    </div>
    <div class="window-body">
      <p>
        <strong>Organisasjonsnummer:</strong>
        {{ customer.organizationNumber }}
      </p>
      <div class="field-row">
        <label :for="'notes-' + customer.organizationNumber">Notater:</label>
        <textarea
          :id="'notes-' + customer.organizationNumber"
          v-model="customer.notes"
          @update:modelValue="
            (value) => emit('update:notes', customer.organizationNumber, value)
          "
          rows="3"
        ></textarea>
      </div>
      <div class="field-row" style="justify-content: flex-end; margin-top: 8px">
        <button @click="handleDeleteCustomer">Slett kunde</button>
      </div>
    </div>
  </div>
</template>
