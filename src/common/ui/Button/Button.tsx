import { forwardRef, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  text: string;
  type: BUTTON_TYPES;
  onClick: () => void;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(({ text, type, onClick, icon }, ref) => {
  return (
    <button ref={ref} className={cn(styles.btn, styles[type])} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
});

Button.displayName = 'Button';
