import { FC, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { IIconType } from 'types/common';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  prevIcon?: IIconType;
  disabled?: boolean;
  placeholderText?: string;
}

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ disabled = false, className, prevIcon = null, placeholderText = 'Поле не может быть пустым', type, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    useEffect(() => {
      if (inputValue === '') {
        setInputValue(placeholderText);
      }
    }, [inputValue, placeholderText]);
    return (
      <div className={cn(styles.inputContainer, className, { [styles.disabled]: disabled })}>
        {!!prevIcon && <Icon type={prevIcon} className={styles.prevIcon} />}
        <input
          type={type}
          className={styles.input}
          ref={ref}
          {...rest}
          disabled={disabled}
          onChange={handleChange}
          value={inputValue === placeholderText ? '' : inputValue}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
