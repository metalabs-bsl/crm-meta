import { DatePicker } from 'common/ui';
import styles from './style.module.scss';

export const TodoCreateForm = () => {
  return (
    <form className={styles.textareaBlock}>
      <textarea name='' id='' placeholder='Напишите что нужно сделать'></textarea>
      <DatePicker className={styles.datePicker} defaultValue='2024-05-08T11:11' />
    </form>
  );
};
