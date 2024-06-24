import { FC } from 'react';
import { Input } from 'common/ui';
import { IListItem } from '../../types/ITableData';
import styles from './styles.module.scss';

interface NewExpenseRowProps {
  item: IListItem;
  onChange: (field: keyof IListItem, value: string | number) => void;
}

export const NewExpenseRow: FC<NewExpenseRowProps> = ({ item, onChange }) => {
  return (
    <>
      <div className={`${styles.editColumn} ${styles.editNaming}`}>
        <Input className={styles.editInput} placeholder='Пусто' value={item.name} onChange={(e) => onChange('name', e.target.value)} />
      </div>
      <div className={`${styles.editColumn} ${styles.editQuantity}`}>
        <Input
          className={styles.editInput}
          placeholder='Пусто'
          value={item.quantity}
          onChange={(e) => onChange('quantity', e.target.value)}
        />
      </div>
      <div className={`${styles.editColumn} ${styles.editPrice}`}>
        <Input className={styles.editInput} placeholder='Пусто' value={item.price} onChange={(e) => onChange('price', e.target.value)} />
      </div>
    </>
  );
};
