import { type FC, useEffect, useState } from 'react';
import { ICreatePaymentParams } from 'types/entities';
import { ICalcPayment } from 'types/entities/leads';
import { PaymentDetailsFrom } from './PaymentDetailsFrom';

interface IProps {
  paymentsList: ICalcPayment[] | undefined;
  isFullPayment: boolean | undefined;
  isActiveTab: string;
  calculator_id: string | null;
}

const ordinalTitles = ['Первая оплата', 'Вторая оплата', 'Третья оплата', 'Четвертая оплата', 'Пятая оплата'];

const defaultPayment = [
  {
    title: 'Данные об оплате',
    isEdit: true
  }
];

export const PaymentsDetails: FC<IProps> = ({ isActiveTab, paymentsList, calculator_id }) => {
  const [paymentAccordions, setPaymentAccordions] = useState(defaultPayment);
  const [paymentForms, setPaymentForms] = useState<ICreatePaymentParams[]>([]);

  useEffect(() => {
    console.log('Полученные данные paymentsList:', paymentsList);
    console.log('Полученный calculator_id:', calculator_id);

    if (paymentsList && paymentsList.length > 0) {
      const initialPaymentForms = paymentsList.map((payment) => ({
        id: payment.id,
        brutto: Number(payment.brutto) || 0,
        netto: Number(payment.netto) || 0,
        exchange_rate: Number(payment.exchange_rate) || 0,
        payment_method: Number(payment.payment_method) || 0,
        course_TO: Number(payment.course_TO) || 0,
        commission: Number(payment.commission) || 0,
        client_due_date: payment.client_due_date,
        calculator: {
          id: calculator_id || ''
        },
        currency: payment?.currency || ''
      }));
      const initialPaymentAccordions = initialPaymentForms.map((_, index) => ({
        title: ordinalTitles[index],
        isEdit: false
      }));
      setPaymentForms(initialPaymentForms);
      setPaymentAccordions(initialPaymentAccordions);
    } else {
      const newPaymentForm: ICreatePaymentParams = {
        id: '',
        brutto: 0,
        netto: 0,
        exchange_rate: 0,
        payment_method: 0,
        course_TO: 0,
        commission: 0,
        client_due_date: '',
        calculator: {
          id: calculator_id || ''
        },
        currency: ''
      };
      const newAccordion = {
        title: isActiveTab === 'full' ? 'Данные об оплате' : 'Первая оплата',
        isEdit: true
      };
      setPaymentForms([newPaymentForm]);
      setPaymentAccordions([newAccordion]);
    }
  }, [paymentsList, calculator_id, isActiveTab]);

  const handleEditPaymentAccordion = (index: number) => {
    setPaymentAccordions(
      paymentAccordions.map((accordion, i) => ({
        ...accordion,
        isEdit: i === index ? !accordion.isEdit : false
      }))
    );
  };

  const handleAddPaymentAccordion = () => {
    const newAccordionIndex = paymentAccordions.length;
    const newAccordionTitle = ordinalTitles[newAccordionIndex];
    const newPaymentForm: ICreatePaymentParams = {
      id: '',
      brutto: 0,
      netto: 0,
      exchange_rate: 0,
      payment_method: 0,
      course_TO: 0,
      commission: 0,
      client_due_date: '',
      calculator: {
        id: calculator_id || ''
      },
      currency: ''
    };
    setPaymentAccordions([
      ...paymentAccordions,
      {
        title: newAccordionTitle,
        isEdit: true
      }
    ]);
    setPaymentForms([...paymentForms, newPaymentForm]);
  };

  const handleDeletePaymentAccordion = (index: number) => {
    console.log('Вызвана функция handleDeletePaymentAccordion с индексом:', index);
    console.log('Текущие paymentAccordions до удаления:', paymentAccordions);
    console.log('Текущие paymentForms до удаления:', paymentForms);
    const updatedAccordions = paymentAccordions.filter((_, i) => i !== index);
    const updatedForms = paymentForms.filter((_, i) => i !== index);
    console.log('Обновленные paymentAccordions после удаления:', updatedAccordions);
    console.log('Обновленные paymentForms после удаления:', updatedForms);
    setPaymentAccordions(updatedAccordions);
    setPaymentForms(updatedForms);
  };

  useEffect(() => {
    if (isActiveTab === 'full') {
      setPaymentAccordions(defaultPayment);
    }
  }, [isActiveTab]);

  return (
    <>
      {paymentForms.map((payment, idx) => {
        console.log(`Рендеринг платежа с индексом ${idx}:`, payment);
        console.log(`Рендеринг аккордеона с индексом ${idx}:`, paymentAccordions[idx]);

        return (
          <PaymentDetailsFrom
            isActiveTab={isActiveTab}
            formProps={payment}
            key={idx}
            index={idx}
            title={paymentAccordions[idx]?.title || 'Первая оплата'}
            isEdit={paymentAccordions[idx]?.isEdit}
            handleAddPaymentAccordion={handleAddPaymentAccordion}
            handleEditPaymentAccordion={handleEditPaymentAccordion}
            paymentAccordions={paymentAccordions}
            handleDeletePaymentAccordion={handleDeletePaymentAccordion}
          />
        );
      })}
    </>
  );
};
