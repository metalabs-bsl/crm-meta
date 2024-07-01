import { FC } from 'react';
import { Button, DatePicker, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { useAddEmployeeMutation } from 'api/admin/employees/employees.api';
import styles from './style.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

interface IFormInput {
  fio: string;
  status: string;
  phone: string;
  email: string;
  internshipStartDate: string;
  employmentStartDate: string;
  contract: File;
  passport: File;
}

const AddEmployees: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormInput>();

  const notify = useNotify();
  // const isFormValid = fio !== '' && status !== '' && phone !== '' && email !== '';
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData();
    formData.append('fio', data.fio);
    formData.append('status', data.status);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('internshipStartDate', data.internshipStartDate);
    formData.append('employmentStartDate', data.employmentStartDate);
    formData.append('contract', data.contract);
    formData.append('passport', data.passport);

    addEmployee(formData)
      .then(() => {
        notify('Сотрудник успешно добавлен!', 'success');
      })
      .catch(() => {
        notify('Ошибка при добавлении сотрудника', 'error');
      });
  };

  return (
    <Loading isSpin={isLoading}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.header}>
            <h4 className={styles.title}>Добавить сотрудника</h4>
            <Button styleType={BUTTON_TYPES.YELLOW} text='Создать' className={styles.btn} />
          </div>
          <div className={styles.field}>
            <div className={styles.field}>
              <label>ФИО</label>
              <input type='text' {...register('fio', { required: 'Введите ФИО' })} placeholder='Введите ФИО' className={styles.input} />
              {errors.fio && <span className={styles.error}>{errors.fio.message}</span>}
            </div>
            <div className={styles.field}>
              <label>Статус</label>
              <select {...register('status', { required: 'Выберите статус' })} className={styles.input}>
                <option value=''>Выберите статус</option>
                <option value='Intern'>Стажёр</option>
                <option value='Manager'>Менеджер</option>
                <option value='Senior Manager'>Менеджер-руководитель</option>
                <option value='Director'>Руководитель</option>
              </select>
              {errors.status && <span className={styles.error}>{errors.status.message}</span>}
            </div>
            <div className={styles.field}>
              <label>Номер телефона</label>
              <input
                type='tel'
                {...register('phone', { required: 'Введите номер телефона' })}
                placeholder='+996 (xxx) xxx-xxx'
                className={styles.input}
              />
              {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>
            <div className={styles.field}>
              <label>Почта</label>
              <input
                type='email'
                {...register('email', { required: 'Введите почту' })}
                placeholder='Введите почту'
                className={styles.input}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div className={styles.dates}>
              <div className={styles.field}>
                <label>Дата начала стажировки</label>
                <DatePicker onChange={(date) => setValue('employmentStartDate', date as unknown as string)} />

                {errors.internshipStartDate && <span className={styles.error}>{errors.internshipStartDate.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Дата начала работы</label>
                <DatePicker onChange={(date) => setValue('employmentStartDate', date as unknown as string)} />
                {errors.employmentStartDate && <span className={styles.error}>{errors.employmentStartDate.message}</span>}
              </div>
            </div>
            {/* <div className={styles.agreement}>
              <label>Договор</label>
              <FilePicker />
              {errors.contract && <span className={styles.error}>{errors.contract.message}</span>}
            </div>
            <div className={styles.passport}>
              <label>ID паспорта</label>
              <FilePicker />
              {errors.passport && <span className={styles.error}>{errors.passport.message}</span>}
            </div> */}
          </div>
        </form>
      </div>
    </Loading>
  );
};

export default AddEmployees;
