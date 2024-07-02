import { FC, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  showCoincidences?: boolean;
  onValueChange?: (text: string) => void;
  onCoincidencesChange?: (id: string) => void;
}

const coincidenceOptions = [
  {
    label: 'dfgh',
    Value: '4a0a217f-c1b7-4961-a8d8-c805c7b896ec'
  },
  {
    label: 'test 2',
    Value: '631b0db9-3109-4a6c-bb49-c0fbea1890c1'
  }
];

export const SearchInput: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ showCoincidences = false, onValueChange, onCoincidencesChange, className, ...rest }, ref) => {
    const [value, setValue] = useState<string>('');

    const handleClear = () => {
      setValue('');
    };

    const onCoincidenceClick = (id: string) => {
      onCoincidencesChange && onCoincidencesChange(id);
      setValue('');
    };

    useEffect(() => {
      if (onValueChange) {
        onValueChange(value);
      }
    }, [onValueChange, value]);

    return (
      <div
        className={cn(styles.inputContainer, className, {
          [styles.isHasWord]: !!value.length,
          [styles.showCoincidences]: showCoincidences && !!value.length
        })}
      >
        <input value={value} onChange={(e) => setValue(e.target.value)} type='text' className={styles.input} ref={ref} {...rest} />
        <div className={styles.IconsBlock}>
          {!!value.length && <Icon type='search-clear' onClick={handleClear} />}
          <Icon type={`search-${!!value.length ? 'black' : 'white'}`} alt='search' className={styles.searchIcon} />
        </div>
        {showCoincidences && !!value.length && (
          <div className={styles.coincidence}>
            {coincidenceOptions.map((item) => (
              <div key={item.Value} className={styles.coincidence_item} onClick={() => onCoincidenceClick(item.Value)}>
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
