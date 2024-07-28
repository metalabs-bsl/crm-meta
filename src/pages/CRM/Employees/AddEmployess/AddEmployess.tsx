import { FC, FormEvent, useState } from 'react';
import { FilePicker, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateEmployeeMutation } from 'api/admin/employees/employees.api';
import { getEngStatus } from '../Employees.helper';
import styles from './style.module.scss';

import { BG_TYPES } from 'types/enums';

interface IProps {
  setShowAddEmployee: (arg0: boolean) => void;
}

const AddEmployees: FC<IProps> = ({ setShowAddEmployee }) => {
  const notify = useNotify();
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailPassword, setEmailPassword] = useState<string>('');
  const [startInternship, setStartInternship] = useState<string>('');
  const [startWork, setStartWork] = useState<string>('');
  const [loginCRM, setLoginCRM] = useState<string>('');
  const [passwordCRM, setPasswordCRM] = useState<string>('');
  const [contractFiles, setContractFiles] = useState<File[]>([]);
  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // это создано временно и перестанет работать как только сотрётся база
    const roles = [
      {
        id: 'ecc5edf6-6774-4dec-bb63-0c27d7c06777',
        role_name: 'Intern'
      },
      {
        id: '2d5e047a-56ac-4d90-924f-7c52174de3dc',
        role_name: 'Manager'
      },
      {
        id: '3b2fbba6-5fd0-41f5-b092-f619d82bd93a',
        role_name: 'Senior Manager'
      },
      {
        id: '8bd6cb95-ecb6-4a2a-a634-a9930ac3a468',
        role_name: 'Director'
      }
    ];

    const formData = new FormData();
    const employeeData = {
      login: loginCRM,
      password: passwordCRM,
      job_title: status,
      date_of_birth: dateOfBirth,
      first_name: firstName,
      second_name: secondName,
      email: email,
      middle_name: middleName,
      phone: phone,
      start_of_internship: startInternship,
      end_of_internship: null,
      start_of_work: startWork,
      background: BG_TYPES.SECOND_TEXTURE,
      status: 1,
      roles: [roles.find((role) => role.role_name === getEngStatus(status))]
      // роль надо переделать на get запрос получения всех ролей когда будет готово в бэке
    };

    formData.append('employeeInfo', JSON.stringify(employeeData));

    contractFiles.forEach((file) => {
      formData.append(`contract`, file);
    });
    passportFiles.forEach((file) => {
      formData.append(`passport`, file);
    });

    createEmployee(formData)
      .unwrap()
      .then(() => {
        notify(MESSAGE.SUCCESS, 'success');
        setShowAddEmployee(false);
      })
      .catch(() => notify(MESSAGE.ERROR, 'error'));
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
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value=''>Выберите статус</option>
                <option value='Стажёр'>Стажёр</option>
                <option value='Менеджер'>Менеджер</option>
                <option value='Менеджер-руководитель'>Менеджер-руководитель</option>
                <option value='Руководитель'>Руководитель</option>
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
              <FilePicker onFilesSelect={setContractFiles} />
            </div>
            <div className={styles.passport}>
              <label>ID паспорт</label>
              <FilePicker onFilesSelect={setPassportFiles} />
            </div>
          </div>
        </form>
      </Loading>
    </div>
  );
};

export default AddEmployees;

