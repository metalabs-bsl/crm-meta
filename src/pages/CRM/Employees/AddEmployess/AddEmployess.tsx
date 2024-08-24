import { FC, FormEvent, useState } from 'react';
import { FilePicker, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateEmployeeMutation, useGetEmployeeRolesQuery } from 'api/admin/employees/employees.api';
import { getRusRole } from '../Employees.helper';
import styles from './style.module.scss';

import { BG_TYPES } from 'types/enums';

interface IProps {
  setShowAddEmployee: (arg0: boolean) => void;
}

export const AddEmployees: FC<IProps> = ({ setShowAddEmployee }) => {
  const notify = useNotify();
  const { data: rolesAll } = useGetEmployeeRolesQuery();
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailPassword, setEmailPassword] = useState<string>('');
  const [startInternship, setStartInternship] = useState<string>('');
  const [startWork, setStartWork] = useState<string>('');
  const [loginCRM, setLoginCRM] = useState<string>('');
  const [passwordCRM, setPasswordCRM] = useState<string>('');
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [frontPassport, setFrontPassport] = useState<File | null>(null);
  const [backPassport, setBackPassport] = useState<File | null>(null);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const employeeData = {
      login: loginCRM,
      password: passwordCRM,
      job_title: getRusRole(rolesAll?.find((el) => el.id === role)?.role_name || ''),
      date_of_birth: dateOfBirth,
      first_name: firstName,
      second_name: secondName,
      email: email,
      email_password: emailPassword,
      middle_name: middleName,
      phone: phone,
      start_of_internship: startInternship,
      end_of_internship: null,
      start_of_work: startWork,
      background: BG_TYPES.SECOND_TEXTURE,
      status: 1,
      roles: [rolesAll?.find((el) => el.id === role)]
    };

    formData.append('employeeInfo', JSON.stringify(employeeData));

    if (contractFile && frontPassport && backPassport) {
      formData.append(`contract`, contractFile);
      formData.append(`passport_front`, frontPassport);
      formData.append(`passport_back`, backPassport);
    }

    try {
      await createEmployee(formData).unwrap();
      notify(MESSAGE.SUCCESS, 'success');
    } catch (error) {
      notify(MESSAGE.ERROR, 'error');
    } finally {
      setShowAddEmployee(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Loading isSpin={isLoading}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h4 className={styles.title}>Добавить сотрудника</h4>
            <button type='submit' className={styles.submitButton}>
              Создать
            </button>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Имя</label>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Введите имя'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Фамилия</label>
              <input
                type='text'
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                placeholder='Введите фамилию'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Отчество</label>
              <input
                type='text'
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder='Введите отчество'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Дата рождения</label>
              <input
                type='date'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder='Не выбрано'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Статус</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={''}>Выберите должность</option>
                {rolesAll?.map((role) => (
                  <option value={role.id} key={role.id}>
                    {getRusRole(role.role_name)}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Номер телефона</label>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='+996 (xxx) xxx-xxx'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Почта</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Введите почту'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Пароль от почты</label>
              <input
                type='text'
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder='Введите пароль от почты'
                className={styles.input}
              />
            </div>
            <div className={styles.dates}>
              <div className={styles.field}>
                <label>Дата начала стажировки</label>
                <input
                  type='date'
                  value={startInternship}
                  onChange={(e) => setStartInternship(e.target.value)}
                  placeholder='Введите дату начала стажировки'
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label>Дата начала работы</label>
                <input
                  type='date'
                  value={startWork}
                  onChange={(e) => setStartWork(e.target.value)}
                  placeholder='Введите дату начала работы'
                  className={styles.input}
                />
              </div>
            </div>
            <div></div>
            <div className={styles.field}>
              <label>Логин в CRM</label>
              <input
                type='text'
                value={loginCRM}
                onChange={(e) => setLoginCRM(e.target.value)}
                placeholder='Введите логин в CRM'
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Пароль в CRM</label>
              <input
                type='text'
                value={passwordCRM}
                onChange={(e) => setPasswordCRM(e.target.value)}
                placeholder='Введите пароль в CRM'
                className={styles.input}
              />
            </div>
            <div className={styles.agreement}>
              <label>Договор</label>
              <FilePicker onChange={setContractFile} />
            </div>
            <div className={styles.passport}>
              <label>Передняя сторона паспорта</label>
              <FilePicker onChange={setFrontPassport} />
            </div>
            <div className={styles.passport}>
              <label>Задняя сторона паспорта</label>
              <FilePicker onChange={setBackPassport} />
            </div>
          </div>
        </form>
      </Loading>
    </div>
  );
};
