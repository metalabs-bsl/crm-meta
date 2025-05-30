import { FC, useEffect, useMemo, useState } from 'react';
import { Button, FilePicker, Loading, Select } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateInvoiceMutation, useGetPaymentsForInvoicesFormQuery } from 'api/admin/leads/endpoints/invoice';
import { Options } from 'types/common';
import { IInvoiseSelectOptions } from 'types/entities';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface FormFields {
  invoice_text: string;
  payment_id: string;
}

interface IProps {
  leadId: string;
}

export const CreateFileForm: FC<IProps> = ({ leadId }) => {
  const notify = useNotify();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { data } = useGetPaymentsForInvoicesFormQuery(leadId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileReset, setIsFileReset] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormFields>();

  useEffect(() => {
    if (data && data.length > 2) {
      setValue('payment_id', data[0].id);
    }
  }, [data, setValue]);

  const selectOptions = useMemo<Options[]>(() => {
    return (
      data?.map((i: IInvoiseSelectOptions) => {
        return { label: i.name, value: i.id };
      }) || []
    );
  }, [data]);

  const onSubmit = (formFields: FormFields) => {
    if (data && selectedFile) {
      const updatedData = {
        ...formFields,
        is_payment_data: data.find((i) => i.id === formFields.payment_id)?.isPaymentsData
      };

      const formData = new FormData();
      formData.append('leadsInvoiceInfo', JSON.stringify(updatedData));
      formData.append('file', selectedFile);
      createInvoice(formData)
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
          reset();
          setSelectedFile(null);
          setIsFileReset(true);
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  return (
    <Loading isSpin={isLoading}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Select options={selectOptions} {...register('payment_id', { required: 'Поле обязательно' })} />
        {errors.payment_id && <span className={styles.errorMessage}>{errors.payment_id.message}</span>}

        <textarea
          id='description'
          placeholder='Напишите что нужно сделать'
          className={styles.textarea}
          {...register('invoice_text', { required: 'Поле обязательно' })}
        />
        {errors.invoice_text && <span className={styles.errorMessage}>{errors.invoice_text.message}</span>}
        <FilePicker onChange={setSelectedFile} isAfterReset={isFileReset} setIsAfterReset={setIsFileReset} />
        <Button styleType={BUTTON_TYPES.YELLOW} text='отправить' type='submit' disabled={!selectedFile} />
      </form>
    </Loading>
  );
};
