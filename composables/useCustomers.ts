import type { customer } from "~/types/customer";

export const useCustomers = () => {
  const savedCustomers = useState<customer[]>("customers", () => []);

  // Load customers from localStorage on init
  onMounted(() => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      savedCustomers.value = JSON.parse(stored);
    }
  });

  // Save new customer
  const saveCustomer = (customer: customer) => {
    const exists = savedCustomers.value.some(
      (c) => c.organizationNumber === customer.organizationNumber
    );
    if (!exists) {
      savedCustomers.value.push(customer);
      localStorage.setItem("customers", JSON.stringify(savedCustomers.value));
    }
  };

  // Check if customer is already saved
  const isCustomerSaved = (organizationNumber: string) => {
    return savedCustomers.value.some(
      (customer) => customer.organizationNumber === organizationNumber
    );
  };

  // Remove customer
  const removeCustomer = (organizationNumber: string) => {
    const updatedCustomers = savedCustomers.value.filter(
      (customer: customer) => customer.organizationNumber !== organizationNumber
    );
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    savedCustomers.value = updatedCustomers;
  };

  // Update customer notes
  const updateNotes = (organizationNumber: string, notes: string) => {
    const customer = savedCustomers.value.find(
      (c) => c.organizationNumber === organizationNumber
    );
    if (customer) {
      customer.notes = notes;
      localStorage.setItem("customers", JSON.stringify(savedCustomers.value));
    }
  };

  return {
    savedCustomers,
    removeCustomer,
    isCustomerSaved,
    saveCustomer,
    updateNotes,
  };
};
