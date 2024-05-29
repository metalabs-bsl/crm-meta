import { FC, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { IIconType } from 'types/common';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  isSearch?: boolean;
  prevIcon?: IIconType;
}

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({ className, isSearch = false, prevIcon = null, ...rest }, ref) => {
  return (
    <div className={cn(styles.inputContainer, className)}>
      {!!prevIcon && <Icon type={prevIcon} className={styles.prevIcon} />}
      <input type='text' className={styles.input} ref={ref} {...rest} />
      {isSearch && <Icon type='search' alt='search' className={styles.searchIcon} />}
    </div>
  );
});

Input.displayName = 'Input';
