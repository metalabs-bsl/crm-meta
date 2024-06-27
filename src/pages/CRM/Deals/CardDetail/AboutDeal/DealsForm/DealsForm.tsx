import { useState } from 'react';
import cn from 'classnames';
import { Button, DatePicker, Icon, Input, Loading } from 'common/ui';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { useGetSourseLeadQuery } from 'api/admin/leads/leads.api';
import { IItem } from './DeasForm.helper';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const DealsForm = ({ ...rest }) => {
  const { isNewDeal } = rest;
  const [isEdit, setIsEdit] = useState<boolean>(isNewDeal);
  const { data: responsibleOptions, isFetching: isResponsibleFetching } = useGetResponsibleEmployeesQuery();
  const { data: sourceOptions, isFetching: isSourceFetching } = useGetSourseLeadQuery();
  const FormItems: IItem[] = [
    {
      label: 'Наименование',
      value: '',
      type: 'text'
    },
    {
      label: 'Клиент',
      value: '',
      type: 'text'
    },
    {
      label: 'Номер телефона',
      value: '',
      type: 'text'
    },
    {
      label: 'Город проживания',
      value: '',
      type: 'text'
    },
    {
      label: 'Источник',
      value: '',
      type: 'select',
      options: sourceOptions
    },
    {
      items: [
        {
          label: 'Дата рождения клиента',
          value: '',
          type: 'datetime-local'
        },
        {
          label: 'Дата создания сделки',
          value: '',
          type: 'datetime-local'
        }
      ]
    },
    {
      label: 'Ответственный',
      value: '',
      type: 'select',
      options: responsibleOptions
    }
  ];

  return (
    <Loading isSpin={isResponsibleFetching || isSourceFetching}>
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
                              {option.label}
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
                        {option.label}
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
    </Loading>
  );
};
