<script setup lang="ts">
import CustomerCard from "~/components/customer/CustomerCard.vue";

const { customers, updateCustomerNotes, deleteCustomer } = useCustomerActions();
</script>

<template>
  <div v-if="customers.length === 0" class="customer-status">
    Ingen lagrede kunder enda. Bruk søkefunksjonen for å legge til kunder.
  </div>

  <div v-else class="saved-customers">
    <CustomerCard
      v-for="customer in customers"
      :key="customer.organizationNumber"
      :customer="customer"
      @update:notes="updateCustomerNotes"
      @delete="deleteCustomer"
    />
  </div>
</template>
