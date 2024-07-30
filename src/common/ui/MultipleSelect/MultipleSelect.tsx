import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Options } from 'types/pages';
import { Icon } from '../Icon';
import { Radio } from '../Radio';
import styles from './styles.module.scss';

interface IProps {
  placeholder: string;
  options: Options[];
  defaultValue?: Options[];
  disabled?: boolean;
  onChange?: (data: Options[]) => void;
}

export const MultipleSelect: FC<IProps> = ({ placeholder = '', options, defaultValue, disabled = false, onChange }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Options[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValues(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (value: Options) => {
    let updatedValues: Options[];

    if (!value.value) {
      updatedValues = [value];
    } else {
      updatedValues = selectedValues.filter((item) => !!item.value && item);
      const isSelected = updatedValues.some((item) => item.value === value.value);

      if (isSelected) {
        if (updatedValues.length > 1) {
          updatedValues = updatedValues.filter((item) => item.value !== value.value);
        } else {
          updatedValues = options.filter((item) => !item.value && item);
        }
      } else {
        updatedValues = [...updatedValues, value];
      }
    }

    setSelectedValues(updatedValues);
    if (onChange) {
      onChange(updatedValues);
    }
  };

  const onToggleVisible = () => {
    if (!disabled) {
      setIsOptionsOpen(!isOptionsOpen);
    }
  };

  useEffect(() => {
    if (!disabled) {
      setIsOptionsOpen(false);
    }
  }, [disabled]);

  return (
    <div className={styles.select}>
      <div className={cn(styles.showArea, { [styles.disabled]: disabled })} onClick={onToggleVisible}>
        {selectedValues.length ? selectedValues.map((op) => op.label).join(', ') : placeholder}
        <Icon type='arrow-up' className={cn(styles.arrow, { [styles.arrow_closed]: isOptionsOpen })} onClick={onToggleVisible} />
      </div>
      {!disabled && isOptionsOpen && (
        <div className={styles.options_area}>
          {options.map((op) => (
            <div className={styles.option} key={op.value} onClick={() => handleChange(op)}>
              <div className={styles.radioWrapper}>
                <Radio readOnly checked={selectedValues.some((i) => i.value === op.value)} />
              </div>
              {op.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
