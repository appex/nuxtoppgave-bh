<script setup lang="ts">
import type { Customer } from "~/types/customer";
const toast = useToast();

const { searchQuery, searchResults, isLoading, error } = useBrregApi();
const { saveCustomer, isCustomerSaved } = useCustomerActions();

const handleSaveCompany = (company: Customer) => {
  try {
    saveCustomer({
      organizationNumber: company.organizationNumber,
      name: company.name,
      notes: "",
    });
    toast.success("Kunden er lagret!");
  } catch (error) {
    toast.error("Feil ved lagring av kunde!");
  }
};
</script>

<template>
  <div class="field-row">
    <label for="search">Bedriftsnavn:</label>
    <input
      id="search"
      type="text"
      v-model="searchQuery"
    />
  </div>

  <div v-if="isLoading" class="status">Søker...</div>

  <div v-if="error" class="status error">
    {{ error.message }}
  </div>

  <div v-if="searchResults && searchResults.length" class="search-results">
    <table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Organisasjonsnummer</th>
          <th>Lagre</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="company in searchResults"
          :key="company.organizationNumber"
        >
          <td>{{ company.name }}</td>
          <td>{{ company.organizationNumber }}</td>
          <td>
            <template v-if="isCustomerSaved(company.organizationNumber)">
              <span class="saved-text">Lagret</span>
            </template>
            <template v-else>
              <button @click="handleSaveCompany(company)">Lagre kunde</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
