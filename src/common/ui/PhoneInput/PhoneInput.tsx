import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface IProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  initialValue?: string;
  className?: string;
  disabled?: boolean;
}

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
  let formattedNumber = '+996';

  if (cleanedPhoneNumber.length > 3) {
    formattedNumber += `(${cleanedPhoneNumber.slice(3, 6)}`;
  }
  if (cleanedPhoneNumber.length > 6) {
    formattedNumber += `)${cleanedPhoneNumber.slice(6, 9)}`;
  }
  if (cleanedPhoneNumber.length > 9) {
    formattedNumber += `-${cleanedPhoneNumber.slice(9, 12)}`;
  }

  return formattedNumber;
};

export const PhoneInput: React.FC<IProps> = ({ onChange, initialValue, className, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(initialValue || '+996');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      setValue(formatPhoneNumber(initialValue));
    }
  }, [initialValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setValue(formattedValue);

    if (formattedValue.replace(/[^\d]/g, '').length < 9) {
      setError(true);
    } else {
      setError(false);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      ref={inputRef}
      className={`${styles.phoneInput} ${className || ''}`}
      type='text'
      placeholder='+996(000)000-000'
      value={value}
      onChange={handleInputChange}
      disabled={disabled}
      style={{ borderColor: error ? 'red' : undefined }}
    />
  );
};
