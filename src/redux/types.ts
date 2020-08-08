export type CardType = {
  id?: string;
  type?: string;
  cardNumber: string;
  balance: number;
  uid: string;
  displayName: string;
  expiresInMonth: string;
  cvv: string;
  owner_uid: string;
  expiresInYear: string;
  operations?: Operation[];
};

export type AccountType = {
  id?: string;
  displayName: string;
  rate: number;
  owner_uid: string;
  balance: number;
  operations?: Operation[];
};

export type InfoType = {
  id?: string;
  city: string;
  address: string;
  label: string;
  coordinates: Array<number>;
};

export type Operation = {
  type: '-' | '+';
  amount: string;
  date: string;
  icon?: string;
  name: string;
};

export type DisplayedOperation = {
  text: string;
  label: string;
  price: string;
} & Operation;
