import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Options } from 'types/common';
import { Icon } from '../Icon';
import { Radio } from '../Radio';
import styles from './styles.module.scss';

interface IProps {
  placeholder: string;
  options: Options[];
  defaultValue?: Options[];
  disabled?: boolean;
  onChange?: (data: Options[]) => void;
  openSelect: string | null;
  setOpenSelect: (id: string | null) => void;
  selectId: string;
}

export const MultipleSelect: FC<IProps> = ({
  placeholder = '',
  options,
  defaultValue,
  disabled = false,
  onChange,
  openSelect,
  setOpenSelect,
  selectId
}) => {
  const [selectedValues, setSelectedValues] = useState<Options[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValues(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (value: Options) => {
    let updatedValues: Options[];

    if (!value.value) {
      updatedValues = [];
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
      if (openSelect === selectId) {
        setOpenSelect(null);
      } else {
        setOpenSelect(selectId);
      }
    }
  };

  const onClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange && onChange([]);
  };

  return (
    <div className={styles.select}>
      <div className={cn(styles.showArea, { [styles.disabled]: disabled })} onClick={onToggleVisible}>
        {selectedValues.length ? selectedValues.map((op) => op.label).join(', ') : placeholder}
        <div className={styles.arrow}>
          {!!selectedValues.length && <Icon type='search-clear' className={styles.clea} onClick={(e) => onClear(e)} />}
          <Icon type='arrow-up' className={cn({ [styles.arrow_closed]: openSelect !== selectId })} />
        </div>
      </div>
      {!disabled && openSelect === selectId && (
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
