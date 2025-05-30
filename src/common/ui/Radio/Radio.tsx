import React, { forwardRef } from 'react';
import styles from './styles.module.scss';

export const Radio = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <label className={styles.custom_radio}>
      <input type='radio' ref={ref} {...props} />
      <span className={styles.custom_radio__checkmark}></span>
    </label>
  );
});

Radio.displayName = 'Radio';
