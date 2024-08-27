export interface IGetDocumentParams {
  isOriginal: boolean;
  search: string;
}

export interface ICreateDocumentParams {
  contract_number?: string | null;
  name?: string | null;
  body: FormData;
}

export interface IDocument {
  created_at: string;
  files: {
    created_at: string;
    encoding: string;
    filename: string;
    id: string;
    mimetype: string;
    original_name: string;
    path: string;
    size: number;
    updated_at: string;
  };
  id: string;
  isOriginal: true;
  updated_at: string;
  name: string;
  contract_number?: string;
}
