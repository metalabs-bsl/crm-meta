import { FC, useEffect, useState } from 'react';
import { Options } from 'types/pages';
import { DatePicker, Icon, Input, Select } from 'common/ui';
import { Accordion } from 'common/components';
import styles from './styles.module.scss';

interface IProps {
  isActiveTab: string;
}

const payOptions: Options[] = [
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

const ordinalTitles = ['Первая оплата', 'Вторая оплата', 'Третья оплата', 'Четвертая оплата', 'Пятая оплата'];

const defaultPayment = [
  {
    title: 'Данные об оплате',
    isEdit: false
  }
];

export const PaymentDetailsFrom: FC<IProps> = ({ isActiveTab }) => {
  const [paymentAccordions, setPaymentAccordions] = useState(defaultPayment);

  const handleEditPaymentAccordion = (index: number) => {
    setPaymentAccordions(paymentAccordions.map((accordion, i) => (i === index ? { ...accordion, isEdit: !accordion.isEdit } : accordion)));
  };

  const handleAddPaymentAccordion = () => {
    const newAccordionIndex = paymentAccordions.length;
    const newAccordionTitle = ordinalTitles[newAccordionIndex] || `Оплата ${newAccordionIndex + 1}`;
    setPaymentAccordions([
      ...paymentAccordions,
      {
        title: newAccordionTitle,
        isEdit: false
      }
    ]);
  };

  useEffect(() => {
    if (isActiveTab === 'full') {
      console.log(isActiveTab);
      setPaymentAccordions(defaultPayment);
    }
  }, [isActiveTab]);

  return (
    <>
      {paymentAccordions.map((accordion, index) => {
        const { title, isEdit } = accordion;
        return (
          <Accordion
            key={index}
            title={index === 0 && isActiveTab === 'partial' ? 'Первая оплата' : title}
            isEdit={isEdit}
            onEditAction={() => handleEditPaymentAccordion(index)}
          >
            <form className={styles.form}>
              <div className={styles.blocks}>
                <div className={styles.more_items_block}>
                  <div className={styles.item_block}>
                    <label>Брутто</label>
                    <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={!isEdit} />
                  </div>
                  <div className={styles.item_block}>
                    <label>Нетто</label>
                    <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={!isEdit} />
                  </div>
                </div>
                <div className={styles.item_block}>
                  <label>Способ оплаты</label>
                  <Select options={payOptions} className={styles.select} disabled={!isEdit} />
                </div>
              </div>
              <div className={styles.blocks}>
                <div className={styles.item_block}>
                  <label>Валюта</label>
                  <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={!isEdit} />
                </div>
                <div className={styles.item_block}>
                  <label>Комиссия</label>
                  <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={!isEdit} />
                </div>
              </div>
              <div className={styles.blocks}>
                <div className={styles.more_items_block}>
                  <div className={styles.item_block}>
                    <label>Курс ТО</label>
                    <Input placeholder='Не заполнено' className={styles.inp_wrapper} disabled={!isEdit} />
                  </div>
                  <div className={styles.item_block}>
                    <label>СО клиента</label>
                    <DatePicker className={styles.datepicker} disabled={!isEdit} />
                  </div>
                </div>
              </div>
            </form>
          </Accordion>
        );
      })}
      {isActiveTab !== 'full' && paymentAccordions.length < 5 && (
        <Icon type='plus-gray' className={styles.plusIcon} onClick={handleAddPaymentAccordion} />
      )}
    </>
  );
};
