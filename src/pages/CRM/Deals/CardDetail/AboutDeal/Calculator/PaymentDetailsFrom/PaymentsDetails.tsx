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
    isEdit: false
  }
];

export const PaymentsDetails: FC<IProps> = ({ isActiveTab, isFullPayment, paymentsList, calculator_id }) => {
  const [paymentAccordions, setPaymentAccordions] = useState(defaultPayment);
  const [paymentForms, setPaymentForms] = useState<ICreatePaymentParams[]>([]);

  console.log(isFullPayment);

  useEffect(() => {
    if (paymentsList && paymentsList.length > 0) {
      const initialPaymentForms = paymentsList.map((payment) => ({
        id: payment.id,
        brutto: payment.brutto,
        netto: payment.netto,
        exchange_rate: payment.exchange_rate,
        payment_method: payment.payment_method,
        course_TO: payment.course_TO,
        commission: payment.commission,
        client_due_date: payment.client_due_date,
        calculator: {
          id: calculator_id || ''
        },
        currency: {
          id: payment?.currency?.id
        }
      }));
      setPaymentForms(initialPaymentForms);

      const initialPaymentAccordions = initialPaymentForms.map((_, index) => ({
        title: ordinalTitles[index] || `Оплата ${index + 1}`,
        isEdit: false
      }));

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
        currency: {
          id: ''
        }
      };
      setPaymentForms([newPaymentForm]);
      setPaymentAccordions([
        {
          title: ordinalTitles[0] || 'Данные об оплате',
          isEdit: false
        }
      ]);
    }
  }, [paymentsList, calculator_id]);

  const handleEditPaymentAccordion = (index: number) => {
    setPaymentAccordions(paymentAccordions.map((accordion, i) => (i === index ? { ...accordion, isEdit: !accordion.isEdit } : accordion)));
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
      currency: {
        id: ''
      }
    };
    setPaymentAccordions([
      ...paymentAccordions,
      {
        title: newAccordionTitle,
        isEdit: false
      }
    ]);
    setPaymentForms([...paymentForms, newPaymentForm]);
  };

  useEffect(() => {
    if (isActiveTab === 'full') {
      setPaymentAccordions(defaultPayment);
    }
  }, [isActiveTab]);

  return (
    <>
      {paymentForms.map((payment, idx) => (
        <PaymentDetailsFrom
          isActiveTab={isActiveTab}
          formProps={payment}
          key={idx}
          index={idx}
          title={ordinalTitles[idx]}
          isEdit={paymentAccordions[idx]?.isEdit}
          handleAddPaymentAccordion={handleAddPaymentAccordion}
          handleEditPaymentAccordion={handleEditPaymentAccordion}
          paymentAccordions={paymentAccordions}
        />
      ))}
    </>
  );
};
