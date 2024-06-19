import { FC, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (text: string) => void;
}

export const SearchInput: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({ onValueChange, className, ...rest }, ref) => {
  const [value, setValue] = useState<string>('');

  const handleClear = () => {
    setValue('');
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [onValueChange, value]);

  return (
    <div className={cn(styles.inputContainer, className, { [styles.isHasWord]: !!value.length })}>
      <input value={value} onChange={(e) => setValue(e.target.value)} type='text' className={styles.input} ref={ref} {...rest} />
      <div className={styles.IconsBlock}>
        {!!value.length && <Icon type='search-clear' onClick={handleClear} />}
        <Icon type={`search-${!!value.length ? 'black' : 'white'}`} alt='search' className={styles.searchIcon} />
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
