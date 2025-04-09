import { FC, forwardRef, SelectHTMLAttributes } from 'react';
import cn from 'classnames';
import { Options } from 'types/common';
import styles from './style.module.scss';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Options[];
  className?: string;
}

export const Select: FC<IProps> = forwardRef<HTMLSelectElement, IProps>(({ options, className, ...rest }, ref) => {
  return (
    <select className={cn(styles.select, className)} {...rest} ref={ref}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';
