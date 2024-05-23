import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  styleType: BUTTON_TYPES;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(({ text, styleType, icon, className, ...rest }, ref) => {
  return (
    <button ref={ref} className={cn(styles.btn, styles[styleType], className)} {...rest}>
      {icon}
      {text}
    </button>
  );
});

Button.displayName = 'Button';
