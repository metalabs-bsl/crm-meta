import { ChangeEventHandler, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

import IMask from 'imask';

interface IProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initialValue?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  required?: boolean;
}

export const PhoneInput: React.FC<IProps> = ({ onChange, initialValue, disabled = false, className, onBlur, name, required }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: '+{996}(000)000-000'
      });

      const updatePhoneNumber = () => {
        const cleanedPhoneNumber = mask.unmaskedValue;
        if (onChange && inputRef.current) {
          const event = {
            target: inputRef.current
          } as React.ChangeEvent<HTMLInputElement>;
          event.target.value = `+${cleanedPhoneNumber}`;
          onChange(event);
        }
      };

      mask.on('accept', updatePhoneNumber);

      if (initialValue) {
        mask.value = initialValue;
      }

      return () => {
        mask.off('accept', updatePhoneNumber);
        mask.destroy();
      };
    }
  }, [onChange, initialValue]);

  return (
    <input
      ref={inputRef}
      className={`${styles.phoneInput} ${className}`}
      type='text'
      placeholder='+996(000)000-000'
      onBlur={onBlur}
      name={name}
      disabled={disabled}
      required={required}
    />
  );
};
