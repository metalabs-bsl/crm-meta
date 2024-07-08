import { FC, useState } from 'react';
import { Loading, Radio } from 'common/ui';
import { IGetColumnsRes } from 'types/entities';
import styles from './style.module.scss';

interface IProps {
  data: IGetColumnsRes[];
  onChangeValueType: (id: string) => void;
  isLoading: boolean;
}

export const LossForm: FC<IProps> = ({ onChangeValueType, data, isLoading = false }) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValueType(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <Loading isSpin={isLoading}>
      <div className={styles.form}>
        <div className={styles.form_head}>
          Закрытие сделки: <span> Сделка проиграна</span>
        </div>
        <div className={styles.form_content}>
          {data.map((option, index) => (
            <div key={index} className={styles.form_content_item}>
              <Radio id={option.id} name='radioGroup' value={option.id} checked={selectedOption === option.id} onChange={handleChange} />
              <label htmlFor={option.id}>{option.name}</label>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
};
