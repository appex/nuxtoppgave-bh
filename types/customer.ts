export interface Customer {
    organizationNumber: string;
    name: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
  }

export type NewCustomer = Omit<Customer, 'createdAt' | 'updatedAt'>;