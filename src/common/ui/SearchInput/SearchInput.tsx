import { FC, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDebounce } from 'common/hooks';
import { IResSearch } from 'types/entities';
import { Icon } from '../Icon';
import { Loading } from '../Loading';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  showCoincidences?: boolean;
  onValueChange?: (text: string) => void;
  onCoincidencesClick?: (id: string) => void;
  coincidenceOptions?: IResSearch[];
  coincidenceLoading?: boolean;
}

export const SearchInput: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  (
    { showCoincidences = false, onValueChange, onCoincidencesClick, className, coincidenceOptions, coincidenceLoading = false, ...rest },
    ref
  ) => {
    const [value, setValue] = useState<string>('');
    const [debouncedValue] = useDebounce(value, 500);

    const handleClear = () => {
      setValue('');
    };

    const onCoincidenceClick = (id: string) => {
      onCoincidencesClick && onCoincidencesClick(id);
      setValue('');
    };

    useEffect(() => {
      if (debouncedValue && onValueChange) {
        onValueChange(debouncedValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, onValueChange]);

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
            <Loading isSpin={coincidenceLoading}>
              {coincidenceOptions?.length ? (
                coincidenceOptions?.map((item) => (
                  <div key={item.id} className={styles.coincidence_item} onClick={() => onCoincidenceClick(item.id)}>
                    {item.lead_name}
                  </div>
                ))
              ) : (
                <div className={cn(styles.coincidence_item, styles.empty)}>Совпадений не найдено</div>
              )}
            </Loading>
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
