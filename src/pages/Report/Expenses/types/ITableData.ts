export interface IListItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ITableData {
  creationDate: string;
  list: IListItem[];
  total?: number;
}
