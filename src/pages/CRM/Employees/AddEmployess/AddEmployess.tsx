import { FormEvent, useState } from 'react';
import { DatePicker, FilePicker } from 'common/ui';
import styles from './style.module.scss';

const AddEmployess = () => {
  const [fio, setFio] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // const [internshipDate, setInternshipDate] = useState<string>('');
  // const [workDate, setWorkDate] = useState<string>('');
  // const [, setContract] = useState<File | null>(null);
  // const [passportId, setPassportId] = useState<string>('');

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setContract(e.target.files[0]);
  //   }
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Обработка отправки формы
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
        <div className={styles.field}>
          <div className={styles.field}>
            <label>ФИО</label>
            <input type='text' value={fio} onChange={(e) => setFio(e.target.value)} placeholder='Введите ФИО' className={styles.input} />
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
          <div className={styles.dates}>
            <div className={styles.field}>
              <label>Дата начала стажировки</label>
              {/* <input type='date' value={internshipDate} onChange={(e) => setInternshipDate(e.target.value)} /> */}
              <DatePicker />
            </div>
            <div className={styles.field}>
              <label>Дата начала работы</label>
              {/* <input type='date' value={workDate} onChange={(e) => setWorkDate(e.target.value)} /> */}
              <DatePicker />
            </div>
          </div>
          <div className={styles.agreement}>
            <label>Договор</label>
            {/* <input type='file' onChange={handleFileChange} className={styles.agreement_field} /> */}
            <FilePicker />
          </div>
          <div className={styles.passport}>
            <label>ID паспорт</label>
            <FilePicker />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployess;
