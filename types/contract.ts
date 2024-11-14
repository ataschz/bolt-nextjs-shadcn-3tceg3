export type ContractStatus = 'initiated' | 'accepted' | 'rejected' | 'disputed' | 'completed';

export interface ContractParty {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'contractor' | 'client';
}

export interface Contract {
  id: string;
  title: string;
  description: string;
  status: ContractStatus;
  startDate: string;
  estimatedEndDate: string;
  amount: number;
  currency: string;
  parties: ContractParty[];
}