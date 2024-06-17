import { FC, SelectHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './style.module.scss';
interface IOption {
  value: string;
  title: string | number;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  className?: string;
}

export const Select: FC<IProps> = ({ options, className, ...rest }) => {
  return (
    <select className={cn(styles.select, className)} {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};
