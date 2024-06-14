import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import { Radio } from '../Radio';
import styles from './styles.module.scss';

interface Option {
  value: string;
  label: string;
}

interface IProps {
  placeholder: string;
  options: Option[];
  defaultValue?: Option[];
  disabled?: boolean;
}

export const MultipleSelect: FC<IProps> = ({ placeholder = '', options, defaultValue, disabled = false }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValues(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (value: Option) => {
    setSelectedValues((prev) => {
      const isSelected = prev.some((item) => item.value === value.value);
      if (isSelected) {
        return prev.filter((item) => item.value !== value.value);
      } else {
        return [...prev, value];
      }
    });
  };

  const onToggleVisible = () => {
    if (!disabled) {
      setIsOptionsOpen(!isOptionsOpen);
    }
  };

  return (
    <div className={styles.select}>
      <div className={cn(styles.showArea, { [styles.disabled]: disabled })} onClick={onToggleVisible}>
        {selectedValues.length ? selectedValues.map((op) => op.label).join(', ') : placeholder}
        <Icon type='arrow-up' className={cn(styles.arrow, { [styles.arrow_closed]: isOptionsOpen })} onClick={onToggleVisible} />
      </div>
      {isOptionsOpen && (
        <div className={styles.options_area}>
          {options.map((op) => (
            <div className={styles.option} key={op.value} onClick={() => handleChange(op)}>
              <Radio onClick={() => handleChange(op)} readOnly checked={selectedValues.some((i) => i.value === op.value)} />
              {op.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
