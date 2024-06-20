export type IChangeItemStatus = 'history-edit' | 'history-todo' | 'history-accounts' | 'history-comment' | 'history-deal';
export type StageColorType = 'salat' | 'blue' | 'dark-green' | 'violet' | 'red' | 'light-green' | 'pink' | 'black';
export type PaymentColorType = 'paid' | 'partial' | 'not-paid';

export interface IMarkState {
  label: string;
  color: StageColorType | PaymentColorType;
}
export interface IChangeMarkWIthColor {
  prev: IMarkState;
  current: IMarkState;
}
export interface IChangeMark {
  prev: string;
  current: string;
}
// ---------------------------------------------------------------------
export type EDIT_TYPE = 'edit-naming' | 'edit-status' | 'edit-other';

export interface IOtherItem extends IChangeMark {
  title: string;
}

export interface Edit_Other {
  detailType: EDIT_TYPE;
  items: IOtherItem[];
}

export interface Edit_Naming extends IChangeMark {
  detailType: EDIT_TYPE;
}

export interface Edit_Status extends IChangeMarkWIthColor {
  detailType: EDIT_TYPE;
}

export type EditDetail = Edit_Naming | Edit_Status | Edit_Other;

// ---------------------------------------------------------
export type Todo_Type = 'todo-create' | 'todo-status';

export interface Todo_Create {
  detailType: Todo_Type;
  comment: string;
  dedlineDate: string;
}

export interface Todo_Status extends IChangeMarkWIthColor {
  detailType: Todo_Type;
}

export type TodoDetail = Todo_Create | Todo_Status;
// ---------------------------------------------------------

export type Accounts_Type = 'accounts-create' | 'accounts-delete';
export interface IFile {
  fileUrl: string;
  fileName: string;
}
export interface Account {
  detailType: Accounts_Type;
  payment: string;
  comment: string;
  file: IFile;
}

export type AccountsDetail = Account;

// ------------------------------------------------------------

export type Deals_Type = 'deals-create' | 'deals-status' | 'deals-responsible' | 'deals-sail' | 'deals-loss' | 'deals-calc';

export interface Deals_Create {
  detailType: Deals_Type;
  title: string;
}
export interface Deals_Status extends IChangeMarkWIthColor {
  detailType: Deals_Type;
}

export interface Deals_Responsible extends IChangeMark {
  detailType: Deals_Type;
}

export interface Deals_Sail {
  detailType: Deals_Type;
}

export interface Deals_Loss {
  detailType: Deals_Type;
  lossText: string;
}

export interface Deals_Calc {
  detailType: Deals_Type;
  prev: {
    label: string;
    icon: string;
  };
  current: {
    label: string;
    icon: string;
  };
}

export type DealsDetail = Deals_Create | Deals_Status | Deals_Responsible | Deals_Sail | Deals_Loss | Deals_Calc;

//-------------------------------------------------------------
export type IDetail = EditDetail | TodoDetail | Account | Deals_Create | DealsDetail;

export interface Change {
  description: string;
  timestamp: string;
  status: IChangeItemStatus;
  detail?: IDetail;
}
