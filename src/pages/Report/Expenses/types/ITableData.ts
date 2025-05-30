export interface IListItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ITableData {
  creationDate: string;
  list: IListItem[];
  total?: number;
}
