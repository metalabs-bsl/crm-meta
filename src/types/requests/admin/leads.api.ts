import {
  IColumn,
  ICreateCommentParams,
  ICreateLeadParams,
  ICreateReminderParams,
  ILead,
  IResSource,
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
export module ICreateReminder {
  export type Response = void;
  export type Params = ICreateReminderParams;
}

export module IGetLeadsDeal {
  export type Response = IColumn[];
  export type Params = void;
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
