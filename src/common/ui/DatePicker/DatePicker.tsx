import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const DatePicker: FC<Iprops> = ({ className, ...res }) => {
  return <input type='datetime-local' className={cn(styles.inp, className)} {...res} />;
};
