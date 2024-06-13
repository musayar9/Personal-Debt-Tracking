export interface UserState {
  user: object | null;
  error: string;
  userStatus: string;
  debtStatus: string;
  debt: object | null;
  debtData: object | null;
  debtDataLength: string;
  debtIdData: object | null;
  loading: boolean;
}


interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
}
 export interface FormValues {
  debtName: string;
  lenderName: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: PaymentPlan[];
}

export interface Debt {
  id: number;
  debtName: string;
  lenderName: string;
  debtAmount: number;
  interestRate: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: PaymentPlan[];
}

export interface PaymentData {
  id: string;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  paymentDate: string;
  paymentAmount: number;
  debtId: string;
  userId: string;
}