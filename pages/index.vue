<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useBrregApi } from "~/composables/useBrregApi";
import { useCustomers } from "~/composables/useCustomers";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const searchQuery = ref("");
const { searchResults, isLoading, error, searchCompanies } = useBrregApi();
const { saveCustomer, isCustomerSaved } = useCustomers();

const handleSearch = useDebounceFn(() => {
  searchCompanies(searchQuery.value);
}, 300);

const handleSaveCompany = (company: any) => {
  try {
    saveCustomer({
      organizationNumber: company.organizationNumber,
      name: company.name,
      notes: "",
    });
    toastr.success("Kunden er lagret!");
    // Manually trigger reactivity or update state here if needed
  } catch (error) {
    toastr.error("Feil ved lagring av kunde!");
  }
};
</script>

<template>
  <div class="window" style="width: 100%">
    <div class="title-bar">
      <div class="title-bar-text">Søk etter kunder</div>
    </div>
    <div class="window-body">
      <div class="field-row">
        <label for="search">Bedriftsnavn:</label>
        <input
          id="search"
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>

      <div v-if="isLoading" class="status">Søker...</div>

      <div v-if="error" class="status error">
        {{ error }}
      </div>

      <div v-if="searchResults.length" class="search-results">
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
    </div>
  </div>
</template>
