import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

import IMask from 'imask';

interface IProps {
  onChange?: (phoneNumber: string) => void;
  initialValue?: string;
}

export const PhoneInput: React.FC<IProps> = ({ onChange, initialValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: '+{996}(000)000-000',
        prepare: (value: string) => {
          return value.replace(/[^\d]/g, '');
        }
      });

      const updatePhoneNumber = () => {
        const cleanedPhoneNumber = mask.value.replace(/[()\s-]/g, '');
        if (onChange) {
          onChange(cleanedPhoneNumber);
        }
      };

      mask.on('accept', updatePhoneNumber);
      if (initialValue) {
        const formattedValue = formatPhoneNumber(initialValue);
        mask.value = formattedValue;
      }
      return () => {
        mask.off('accept', updatePhoneNumber);
        mask.destroy();
      };
    }
  }, [onChange, initialValue]);

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    // функция для форматирования с "+996999999999" на "+996(999)999-999"
    const formattedNumber = `+${cleanedPhoneNumber.slice(0, 3)}(${cleanedPhoneNumber.slice(3, 6)})${cleanedPhoneNumber.slice(6, 9)}-${cleanedPhoneNumber.slice(9, 12)}`;
    return formattedNumber;
  };

  return <input ref={inputRef} className={styles.phoneInput} type='text' placeholder='+996(000)000-000' />;
};
