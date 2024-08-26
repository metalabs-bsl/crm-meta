import { IForwardMessageParams, IMail, IMailCounts, IMailParams, ISetPinMessageParams, ISetReadMessageParams } from 'types/entities';

export module IMailGet {
  export type Response = IMail[];
  export type Params = IMailParams;
}

export module IMailSingleGet {
  export type Response = IMail;
  export type Params = string;
}

export module IMailTabsCounts {
  export type Response = IMailCounts;
  export type Params = void;
}

export module ISetReadMessage {
  export type Response = void;
  export type Params = ISetReadMessageParams;
}

export module ISetPinMessage {
  export type Response = void;
  export type Params = ISetPinMessageParams;
}

export module IForwardMessage {
  export type Response = void;
  export type Params = IForwardMessageParams;
}
