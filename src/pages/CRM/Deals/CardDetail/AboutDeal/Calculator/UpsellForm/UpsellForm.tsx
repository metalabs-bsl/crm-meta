import { useState } from 'react';
import { DatePicker, Input, Select } from 'common/ui';
import { Accordion } from 'common/components';
import styles from './style.module.scss';

const payOptions = [
  {
    label: 'Наличными, сом',
    value: 'som'
  },
  {
    label: 'Наличными, $',
    value: 'usd'
  },
  {
    label: 'Наличными, €',
    value: 'eur'
  },
  {
    label: 'Переводом',
    value: 'transaction'
  },
  {
    label: 'Через банк',
    value: 'bank'
  }
];

export const UpsellForm = () => {
  const [isEditUpsell, setIsEditUpsell] = useState<boolean>(false);
  const isEditable = !isEditUpsell;
  return (
    <Accordion title='Дополнительная продажа' onEditAction={() => setIsEditUpsell(!isEditUpsell)} isEdit={isEditUpsell}>
      <form className={styles.form}>
        <div className={styles.blocks}>
          <div className={styles.more_items_block}>
            <div className={styles.item_block}>
              <label>Брутто</label>
              <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
            </div>
            <div className={styles.item_block}>
              <label>Нетто</label>
              <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
            </div>
          </div>
          <div className={styles.item_block}>
            <label>Способ оплаты</label>
            <Select options={payOptions} className={styles.select} disabled={isEditable} />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Валюта (сом)</label>
            <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
          <div className={styles.item_block}>
            <label>Комиссия</label>
            <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.more_items_block}>
            <div className={styles.item_block}>
              <label>Курс ТО</label>
              <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
            </div>
            <div className={styles.item_block}>
              <label>СО клиента</label>
              <DatePicker className={styles.datepicker} disabled={isEditable} />
            </div>
          </div>
          <div className={styles.item_block}>
            <label>Комментарий</label>
            <Input placeholder='Комментарий отсутствует' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
        </div>
      </form>
    </Accordion>
  );
};
