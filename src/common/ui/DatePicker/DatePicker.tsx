import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultValue?: string;
}

export const DatePicker: FC<Iprops> = ({ className, defaultValue, ...res }) => {
  // под вопросом
  // const [currentDateTime, setCurrentDateTime] = useState('');

  // useEffect(() => {
  //   if (defaultValue) {
  //     setCurrentDateTime(defaultValue);
  //   } else {
  //     const formattedDateTime = dayjs().format('YYYY-MM-DDTHH:mm');
  //     setCurrentDateTime(formattedDateTime);
  //   }
  // }, [defaultValue]);

  return <input type='datetime-local' className={cn(styles.inp, className)} {...res} defaultValue={defaultValue} />;
};
