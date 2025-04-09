import { ICreateDocumentParams, IDocument, IGetDocumentParams } from 'types/entities';

export module IGetDocument {
  export type Response = IDocument[];
  export type Params = IGetDocumentParams;
}

export module ICreateDocument {
  export type Response = void;
  export type Params = ICreateDocumentParams;
}

export module IDownloadDocument {
  export type Response = void;
  export type Params = {
    id: string;
    original_name: string;
  };
}
