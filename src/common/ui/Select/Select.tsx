import { FC, SelectHTMLAttributes } from 'react';
import cn from 'classnames';
import { Options } from 'types/pages';
import styles from './style.module.scss';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Options[];
  className?: string;
}

export const Select: FC<IProps> = ({ options, className, ...rest }) => {
  return (
    <select className={cn(styles.select, className)} {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
