import { FC, SelectHTMLAttributes } from 'react';
import styles from './style.module.scss';

interface IOption {
  value: string;
  title: string;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
}

export const Select: FC<IProps> = ({ options, ...rest }) => {
  return (
    <select className={styles.select} {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};
