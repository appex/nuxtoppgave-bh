import type { Customer } from "~/types/customer";

export const useCustomerStore = defineStore("customer", () => {
  const customers = ref<Customer[]>([]);

  // Initialize from localStorage
  const initializeStore = () => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      try {
        customers.value = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored customers:", e);
      }
    }
  };

  // Call initialize when store is created
  onMounted(initializeStore);

  // Save customer from Brreg into local storage
  const saveCustomer = (
    customerData: Omit<Customer, "createdAt" | "updatedAt">
  ) => {
    if (!isCustomerSaved(customerData.organizationNumber)) {
      const customer: Customer = {
        ...customerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      customers.value.push(customer);
      persistToStorage();
    }
  };

  // Check if customer is already saved
  const isCustomerSaved = (organizationNumber: string) =>
    customers.value.some((c) => c.organizationNumber === organizationNumber);

  // Remove customer from list
  const removeCustomer = (organizationNumber: string) => {
    customers.value = customers.value.filter(
      (c) => c.organizationNumber !== organizationNumber
    );
    persistToStorage();
  };

  // Update customer notes  
  const updateNotes = (organizationNumber: string, notes: string) => {
    const customer = customers.value.find(
      (c) => c.organizationNumber === organizationNumber
    );
    if (customer) {
      customer.notes = notes;
      customer.updatedAt = new Date();
      persistToStorage();
    }
  };

  // Save customers to local storage
  const persistToStorage = () => {
    localStorage.setItem("customers", JSON.stringify(customers.value));
  };

  return {
    customers,
    saveCustomer,
    isCustomerSaved,
    removeCustomer,
    updateNotes,
  };
});
