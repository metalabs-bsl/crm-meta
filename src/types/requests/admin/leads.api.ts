import {
  IColumn,
  ICreateCommentParams,
  ICreateInvoiceParams,
  ICreateLeadParams,
  ICreatePaymentParams,
  ICreateReminderParams,
  IgetLeadAdditionalPayments,
  IInvoice,
  IInvoiseSelectOptions,
  ILead,
  IPassportParams,
  IResCalc,
  IResPaymentCurrency,
  IResSearch,
  IResSource,
  ISetAdditionalPaymentRes,
  ITourData,
  IUpdateContract,
  IUpdateLeadCalcPaidStatusParams,
  IUpdateLeadColumnParams,
  IUpdateLeadParams
} from 'types/entities';

export module ICreateLead {
  export type Response = void;
  export type Params = ICreateLeadParams;
}

export module IUpdateLead {
  export type Response = void;
  export type Params = IUpdateLeadParams;
}

export module ISourceLead {
  export type Response = IResSource;
  export type Params = void;
}

export module ICreateComment {
  export type Response = void;
  export type Params = ICreateCommentParams;
}

export module ICreateInvoice {
  export type Response = void;
  export type Params = ICreateInvoiceParams;
}

export module IGetLeadAdditional {
  export type Response = void;
  export type Params = IgetLeadAdditionalPayments;
}

export module ICreateReminder {
  export type Response = void;
  export type Params = ICreateReminderParams;
}

export module IGetLeadsDeal {
  export type Response = IColumn[];
  export type Params = 'my' | 'all';
}
export module IGetLead {
  export type Response = ILead;
  export type Params = string;
}

export module IUpdateLeadColumn {
  export type Response = void;
  export type Params = IUpdateLeadColumnParams;
}

export module IDeleteLead {
  export type Response = ILead;
  export type Params = string;
}

export module IUpdateLeadCalcPaidStatus {
  export type Response = void;
  export type Params = IUpdateLeadCalcPaidStatusParams;
}

export module IGetSearch {
  export type Response = IResSearch[];
  export type Params = string;
}

export module IGetCalc {
  export type Response = IResCalc;
  export type Params = string;
}

export module ICreatePayment {
  export type Response = void;
  export type Params = ICreatePaymentParams;
}

export module IGetPaymentCurrency {
  export type Response = IResPaymentCurrency[];
  export type Params = void;
}

export module ISetTourInfo {
  export type Response = void;
  export type Params = ITourData;
}

export module ISetAdditionalPayment {
  export type Response = void;
  export type Params = ISetAdditionalPaymentRes;
}

export module ISetContract {
  export type Response = void;
  export type Params = IUpdateContract;
}

export module IUploadPassport {
  export type Response = void;
  export type Params = IPassportParams;
}

export module IGetInvoices {
  export type Response = IInvoice[];
  export type Params = string;
}

export module IGetInvoicesSelectData {
  export type Response = IInvoiseSelectOptions[];
  export type Params = string;
}
