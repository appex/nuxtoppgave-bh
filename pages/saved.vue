<script setup lang="ts">
import { useCustomers } from "~/composables/useCustomers";

const { savedCustomers, updateNotes, removeCustomer } = useCustomers();

const handleUpdateCustomerNotes = (organizationNumber: string, notes: string) => {
  updateNotes(organizationNumber, notes);
};

const handleDeleteCustomer = (organizationNumber: string) => {
  if (confirm('Er du sikker på at du vil slette denne kunden?')) {
    removeCustomer(organizationNumber);
  }
};
</script>

<template>
  <div class="window" style="width: 100%">
    <div class="title-bar">
      <div class="title-bar-text">Lagrede kunder</div>
    </div>
    <div class="window-body">
      <div v-if="savedCustomers.length === 0" class="customer-status">
        Ingen lagrede kunder enda. Bruk søkefunksjonen for å legge til kunder.
      </div>

      <div v-else class="saved-customers">
        <div
          v-for="customer in savedCustomers"
          :key="customer.organizationNumber"
          class="customer-card"
        >
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
                <label :for="'notes-' + customer.organizationNumber"
                  >Notater:</label
                >
                <textarea
                  :id="'notes-' + customer.organizationNumber"
                  :value="customer.notes"
                  @input="
                    handleUpdateCustomerNotes(
                      customer.organizationNumber,
                      ($event.target as HTMLTextAreaElement).value
                    )
                  "
                  rows="3"
                ></textarea>
              </div>
              <div class="field-row" style="justify-content: flex-end; margin-top: 8px;">
                <button @click="handleDeleteCustomer(customer.organizationNumber)">
                  Slett kunde
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
