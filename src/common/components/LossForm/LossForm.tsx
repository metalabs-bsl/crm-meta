import { FC, useEffect, useState } from 'react';
import { Radio } from 'common/ui';
import styles from './style.module.scss';

interface IOption {
  label: string;
  value: string;
}

const options: IOption[] = [
  { label: 'Уже куплено', value: '1' },
  { label: 'Дорого', value: '2' },
  { label: 'Не те даты', value: '3' },
  { label: 'Передумал', value: '4' },
  { label: 'Нет ответа', value: '5' }
];
interface IProps {
  onChangeValueType: (type: string, rowIndex?: number) => void;
  onCancel: () => void;
}

export const LossForm: FC<IProps> = ({ onChangeValueType }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      onChangeValueType(selectedOption);
    }
  }, [onChangeValueType, selectedOption]);

  return (
    <div className={styles.form}>
      <div className={styles.form_head}>
        Закрытие сделки: <span> Сделка проиграна</span>
      </div>
      <div className={styles.form_content}>
        {options.map((option, index) => (
          <div key={index} className={styles.form_content_item}>
            <Radio
              id={option.value}
              name='radioGroup'
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
