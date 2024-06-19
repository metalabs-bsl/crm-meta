import { useState } from 'react';
import cn from 'classnames';
import { Button, DatePicker, Icon, Input } from 'common/ui';
import { FormItems } from './DeasForm.helper';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const DealsForm = ({ ...rest }) => {
  const { isNewDeal } = rest;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <form className={cn(styles.dealsForm, { [styles.isNewDeal]: isNewDeal })}>
      <div className={styles.head}>
        <span className={styles.title}>О сделке</span>
        {isEdit ? (
          <div className={styles.btnsBlock}>
            <Button styleType={BUTTON_TYPES.YELLOW} text='сохранить' onClick={() => console.log('onEdit')} type='button' />
            <Button styleType={BUTTON_TYPES.Link_BLACK} text='отменить' onClick={() => setIsEdit(false)} />
          </div>
        ) : (
          <Icon type='edit' onClick={() => setIsEdit(true)} className={styles.edit} />
        )}
      </div>
      <div className={styles.formItems}>
        {FormItems.map((item, index) => {
          if (item.items) {
            return (
              <div key={index} className={styles.moreWrapper}>
                {item.items.map((i, inx) => (
                  <div key={inx} className={styles.inpBlock}>
                    <label htmlFor={item.label}>{i.label}</label>
                    {i.type === 'select' ? (
                      <select disabled={!isEdit} className={styles.select} defaultValue={i.options && i.options[1].value}>
                        {i.options?.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                    ) : i.type === 'datetime-local' ? (
                      <DatePicker defaultValue={i.value} disabled={!isEdit} className={styles.date} />
                    ) : (
                      <Input defaultValue={i.value} className={styles.inp} disabled={!isEdit} prevIcon={i.icon ?? undefined} />
                    )}
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div key={index} className={styles.inpBlock}>
              <label htmlFor={item.label}>{item.label}</label>
              {item.type === 'select' ? (
                <select disabled={!isEdit} className={styles.select} defaultValue={item.options && item.options[1].value}>
                  {item.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.title}
                    </option>
                  ))}
                </select>
              ) : item.type === 'datetime-local' ? (
                <DatePicker defaultValue={item.value} disabled={!isEdit} />
              ) : (
                <Input defaultValue={item.value} className={styles.inp} disabled={!isEdit} prevIcon={item.icon ?? undefined} />
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};
