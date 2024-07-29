import {
  IColumn,
  ICreateCommentParams,
  ICreateLeadParams,
  ICreatePaymentParams,
  ICreateReminderParams,
  ILead,
  IResCalc,
  IResPaymentCurrency,
  IResSearch,
  IResSource,
  IUpdateLeadCalcPaidStatusParams,
  IUpdateLeadColumnParams,
  IUpdateLeadParams
} from 'types/entities';
import { ICreateInvoiceParams, IgetLeadAdditionalPayments } from 'types/entities/leads';

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
