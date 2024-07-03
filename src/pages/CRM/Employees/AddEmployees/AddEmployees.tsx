import { FormEvent, useState } from 'react';
import { DatePicker, FilePicker } from 'common/ui';
import { addEmployee } from '../api/employees';
import styles from './style.module.scss';

const AddEmployees = () => {
  const [fio, setFio] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailPassword, setEmailPassword] = useState<string>('');
  const [loginCRM, setLoginCRM] = useState<string>('');
  const [passwordCRM, setPasswordCRM] = useState<string>('');
  const [contractFiles, setContractFiles] = useState<File[]>([]);
  const [passportFiles, setPassportFiles] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fio', fio);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('status', status);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('emailPassword', emailPassword);
    formData.append('loginCRM', loginCRM);
    formData.append('passwordCRM', passwordCRM);
    contractFiles.forEach((file, index) => {
      formData.append(`contractFiles[${index}]`, file);
    });
    passportFiles.forEach((file, index) => {
      formData.append(`passportFiles[${index}]`, file);
    });

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await addEmployee(formData);
      console.log('Успешная отправка', response);
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h4 className={styles.title}>Добавить сотрудника</h4>
          <button type='submit' className={styles.submitButton}>
            Создать
          </button>
        </div>
        <div className={styles.fields}>
          <div>
            <div className={styles.field}>
              <label>ФИО</label>
              <input type='text' value={fio} onChange={(e) => setFio(e.target.value)} placeholder='Введите ФИО' className={styles.input} />
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
              <DatePicker />
            </div>
            <div className={styles.field}>
              <label>Дата начала работы</label>
              <DatePicker />
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
    </div>
  );
};

export default AddEmployees;
