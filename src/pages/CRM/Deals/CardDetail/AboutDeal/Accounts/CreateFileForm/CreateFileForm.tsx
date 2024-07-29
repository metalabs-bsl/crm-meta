import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Options } from 'types/pages';
import { Button, FilePicker, Loading, Select } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateInvoiceMutation, useGetLeadAdditionalPaymentsQuery } from 'api/admin/leads/endpoints/calculator';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface AdditionalPaymentsData {
  name: string;
  id: string;
}

export const CreateFileForm: React.FC = () => {
  const notify = useNotify();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { data: additionalPaymentsData, isLoading: isLoadingAdditionalPayments } = useGetLeadAdditionalPaymentsQuery();

  // Опции для селекта
  const [options, setOptions] = useState<Options[]>([
    { label: 'Первая оплата', value: 'first' },
    { label: 'Вторая оплата', value: 'second' },
    { label: 'Третья оплата', value: 'third' },
    { label: 'Четвертая оплата', value: 'fourth' },
    { label: 'Пятая оплата', value: 'fifth' }
  ]);

  // Выбранный элемент из селекта
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [additionalPayments, setAdditionalPayments] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (additionalPaymentsData) {
      const paymentOptions = (additionalPaymentsData as AdditionalPaymentsData[]).map((payment) => ({
        label: payment.name,
        value: payment.id // Используем id как value, поскольку это UUID
      }));
      setOptions((prevOptions) => [...prevOptions, ...paymentOptions]);
    }
  }, [additionalPaymentsData]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('File is required');
      return;
    }

    const leadsInvoiceInfo = {
      invoice_text: textareaValue,
      leads_calculator_additional_payments: additionalPayments,
      leads_calculator_payment_data: [selectedOption],
      file_id: selectedFile.name
    };

    const formData = new FormData();
    formData.append('leadsInvoiceInfo', JSON.stringify(leadsInvoiceInfo));
    formData.append('file', selectedFile);

    try {
      const response = await createInvoice(formData).unwrap();
      console.log(response);

      setAdditionalPayments((additionalPaymentsData as unknown as AdditionalPaymentsData[]).map((payment) => payment.id));
      setSelectedOption(selectedOption);

      notify(MESSAGE.SUCCESS, 'success');
    } catch (error) {
      notify(MESSAGE.ERROR, 'error');
      console.error('Error uploading data:', error);
    }
  };

  return (
    <Loading isSpin={isLoading || isLoadingAdditionalPayments}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Select options={options} value={selectedOption} onChange={handleSelectChange} />
        <textarea
          name='description'
          id='description'
          placeholder='Напишите что нужно сделать'
          value={textareaValue}
          onChange={handleTextareaChange}
          className={styles.textarea}
        />
        <FilePicker onChange={handleFileChange} />
        <Button styleType={BUTTON_TYPES.YELLOW} text='отправить' type='submit' />
      </form>
    </Loading>
  );
};
