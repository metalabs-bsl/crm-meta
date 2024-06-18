import { FC, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { IIconType } from 'types/common';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  prevIcon?: IIconType;
}

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({ className, prevIcon = null, ...rest }, ref) => {
  return (
    <div className={cn(styles.inputContainer, className)}>
      {!!prevIcon && <Icon type={prevIcon} className={styles.prevIcon} />}
      <input type='text' className={styles.input} ref={ref} {...rest} />
    </div>
  );
});

Input.displayName = 'Input';
