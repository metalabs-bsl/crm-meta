import { IListItem, ITableData } from './types/ITableData';

// Функция для подсчета суммы одного элемента
const calculateItemTotal = (item: IListItem): number => {
  // Если quantity равно 0, возвращаем только price, иначе quantity * price
  return item.quantity === 0 ? Number(item.price) || 0 : (Number(item.quantity) || 0) * (Number(item.price) || 0);
};

// Функция для добавления свойства total в каждый объект ITableData
export const addTotalToTableData = (tableData: ITableData[]): ITableData[] => {
  return tableData.map((data) => ({
    ...data,
    total: data.list.reduce((total, item) => total + calculateItemTotal(item), 0)
  }));
};

// Функция для подсчета общей суммы всех значений total в tableData
export const calculateTotalTableDataPrice = (tableData: ITableData[]): number => {
  return tableData.reduce((total, data) => total + (data.total || 0), 0);
};

export const calculateTotalForNewItem = (list: IListItem[]): number => {
  return list.reduce((total, item) => {
    // Если quantity равно 0, добавляем только price, иначе quantity * price
    const itemTotal = item.quantity === 0 ? Number(item.price) || 0 : (Number(item.quantity) || 0) * (Number(item.price) || 0);
    return total + itemTotal;
  }, 0);
};

export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
