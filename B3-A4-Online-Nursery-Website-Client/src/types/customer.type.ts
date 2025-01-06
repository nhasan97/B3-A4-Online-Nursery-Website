export type TCustomer = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type TCustomerState = {
  customer: TCustomer | null;
};
