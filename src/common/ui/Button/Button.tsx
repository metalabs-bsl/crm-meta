import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  text: string;
  type: BUTTON_TYPES;
  onClick: () => void;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(({ text, type, onClick }, ref) => {
  return (
    <button ref={ref} className={cn(styles.btn, styles[type])} onClick={onClick}>
      {text}
    </button>
  );
});

Button.displayName = 'Button';
