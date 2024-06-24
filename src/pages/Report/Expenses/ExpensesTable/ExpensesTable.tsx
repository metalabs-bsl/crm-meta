import { Button } from 'common/ui';
import { ExpensesTableRow } from './ExpensesTableRow';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const data = [
  {
    creationData: '2024-06-19',
    naming: ['Item 1', 'Item 2', 'Item 2'],
    quantity: ['2', '3'],
    price: [100, 200]
  },
  {
    creationData: '2024-06-20',
    naming: ['Item 3', 'Item 4'],
    quantity: ['1', '4'],
    price: [300, 400]
  }
];

export const ExpensesTable = () => {
  return (
    <div className={styles.table}>
      <ul className={styles.head}>
        <li className={`${styles.headBlocks} ${styles.data}`}>
          <p className={styles.headText}>Дата</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.naming}`}>
          <p className={styles.headText}>Наименование</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.quantity}`}>
          <p className={styles.headText}>Количество</p>
        </li>
        <li className={`${styles.headBlocks} ${styles.price}`}>
          <p className={styles.headText}>Стоимость</p>
        </li>
      </ul>
      {/* this is the block that appears when you click on btn "Добавить расход" */}
      {/*     ||     */}
      {/*     \/     */}
      <div className={styles.edit}>
        <div className={styles.editWrapper}>
          <div className={`${styles.editColumn} ${styles.editDate}`}>
            <input className={styles.editInput} placeholder='Пусто' />
          </div>
          <div className={`${styles.editColumn} ${styles.editNaming}`}>
            <input className={styles.editInput} placeholder='Пусто' />
            <input className={styles.editInput} placeholder='Пусто' />
          </div>
          <div className={`${styles.editColumn} ${styles.editQuantity}`}>
            <input className={styles.editInput} placeholder='Пусто' />
            <input className={styles.editInput} placeholder='Пусто' />
          </div>
          <div className={`${styles.editColumn} ${styles.editPrice}`}>
            <input className={styles.editInput} placeholder='Пусто' />
            <input className={styles.editInput} placeholder='Пусто' />
          </div>
        </div>
        {/* this 'plus icon' it's btn that create new row of inputs  */}
        <button className={styles.editAdd}>plus icon</button>
        <div className={styles.btnWrapper}>
          <Button className={styles.editSave} styleType={BUTTON_TYPES.GREEN} text='Сохранить' />
          <button className={styles.editDelete}>Отменить</button>
        </div>
      </div>
      {/*     /\     */}
      {/*     ||     */}

      <div className={styles.body}>
        <ExpensesTableRow data={data} />
        <span className={styles.total}>1234 сом</span>
      </div>
    </div>
  );
};
