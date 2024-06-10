import { useState } from 'react';
import cn from 'classnames';
import { DatePicker, Input } from 'common/ui';
import { Accordion } from 'common/components';
import styles from './style.module.scss';

export const AgreementForm = () => {
  const [isEditAgreement, setIsEditAgreement] = useState<boolean>(false);
  const isEditable = !isEditAgreement;
  return (
    <Accordion title='Договор' onEditAction={() => setIsEditAgreement(!isEditAgreement)} isEdit={isEditAgreement}>
      <form className={styles.form}>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Номер договора</label>
            <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
          <div className={styles.more_items_block}>
            <div className={styles.item_block}>
              <label>ID паспорта</label>
              <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
            </div>
            <div className={styles.item_block}>
              <label>ИНН</label>
              <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
            </div>
          </div>
          <div className={styles.item_block}>
            <label>Комментарий</label>
            <Input placeholder='Комментарий отсутствует' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>ФИО</label>
            <Input placeholder='Комментарий отсутствует' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
          <div className={styles.item_block}>
            <label>Источник</label>
            <Input placeholder='Комментарий отсутствует' className={styles.inp_wrapper} disabled={isEditable} />
          </div>
          <div className={styles.item_block}>
            <label>Ответственный</label>
            <Input
              placeholder='Не назначен'
              prevIcon='userIcon'
              className={cn(styles.inp_wrapper, styles.withIcon)}
              disabled={isEditable}
            />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Дата бронирования</label>
            <DatePicker className={styles.datepicker} disabled={isEditable} />
          </div>
        </div>
      </form>
    </Accordion>
  );
};
