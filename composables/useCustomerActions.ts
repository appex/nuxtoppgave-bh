import type { Customer } from "~/types/customer";

export const useCustomerActions = () => {
  const store = useCustomerStore();
  const toast = useToast();

  const saveCustomer = (
    customer: Omit<Customer, "createdAt" | "updatedAt">
  ) => {
    try {
      store.saveCustomer(customer);
      toast.success("Kunden er lagret!");
    } catch (error) {
      toast.error("Feil ved lagring av kunde!");
    }
  };

  const deleteCustomer = (organizationNumber: string) => {
    if (confirm("Er du sikker på at du vil slette denne kunden?")) {
      try {
        store.removeCustomer(organizationNumber);
        toast.success("Kunden er slettet!");
      } catch (error) {
        toast.error("Feil ved sletting av kunde!");
      }
    }
  };

  const updateCustomerNotes = (organizationNumber: string, notes: string) => {
    try {
      store.updateNotes(organizationNumber, notes);
    } catch (error) {
      toast.error("Feil ved oppdatering av notater!");
    }
  };

  return {
    saveCustomer,
    deleteCustomer,
    updateCustomerNotes,
    isCustomerSaved: store.isCustomerSaved,
    customers: computed(() => store.customers),
  };
};
