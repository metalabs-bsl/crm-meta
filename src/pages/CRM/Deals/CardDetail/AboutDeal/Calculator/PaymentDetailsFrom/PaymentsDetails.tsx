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
      console.log('Инициализированные формы платежей:', initialPaymentForms);
      setPaymentForms(initialPaymentForms);
      const initialPaymentAccordions = initialPaymentForms.map((_, index) => ({
        title: ordinalTitles[index] || `Оплата ${index + 1}`, // Названия на основе индекса
        isEdit: false // Все аккордеоны изначально не в режиме редактирования
      }));
      console.log('Инициализированные аккордеоны:', initialPaymentAccordions);
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
      // console.log('Создана новая форма платежа:', newPaymentForm);
      setPaymentForms([newPaymentForm]);
      setPaymentAccordions([
        {
          title: ordinalTitles[0] || 'первая оплата',
          isEdit: false
        }
      ]);
    }
  }, [paymentsList, calculator_id]);

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
    const newAccordionTitle = ordinalTitles[newAccordionIndex] || `Оплата ${newAccordionIndex + 1}`;
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
    // console.log('Добавление нового платежа:', newPaymentForm);
    // console.log('Добавление нового аккордеона с названием:', newAccordionTitle);
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
            title={paymentAccordions[idx]?.title || ''}
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
