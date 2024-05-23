import { FC, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  isSearch?: boolean;
}

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({ className, isSearch = false, ...rest }, ref) => {
  return (
    <div className={cn(styles.inputContainer, className)}>
      <input type='text' className={styles.input} ref={ref} {...rest} />
      {isSearch && <Icon type='search' alt='search' className={styles.searchIcon} />}
    </div>
  );
});

Input.displayName = 'Input';
