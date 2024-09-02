import { FC, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultValue?: string;
  minDate?: string;
  datePicketType?: 'datetime-local' | 'date';
}

export const DatePicker: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ className, defaultValue, minDate, datePicketType = 'datetime-local', ...res }, ref) => {
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

    return (
      <input type={datePicketType} className={cn(styles.inp, className)} {...res} defaultValue={defaultValue} min={minDate} ref={ref} />
    );
  }
);

DatePicker.displayName = 'DatePicker';
