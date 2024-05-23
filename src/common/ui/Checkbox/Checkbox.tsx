import React, { forwardRef } from 'react';
import styles from './styles.module.scss';

export const Checkbox = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <label className={styles.custom_checkbox}>
      <input type='checkbox' ref={ref} {...props} />
      <span className={styles.custom_checkbox__checkmark}></span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
