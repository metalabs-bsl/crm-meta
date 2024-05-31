import { useState } from 'react';
import cn from 'classnames';
import { Input } from 'common/ui';
import styles from './style.module.scss';

const colors = [
  { status: 'without' },
  { status: 'received' },
  { status: 'sale' },
  { status: 'consideration' },
  { status: 'processed' },
  { status: 'booking' },
  { status: 'pink' },
  { status: 'bought' },
  { status: 'black' }
];

export const ColumnCreateForm = () => {
  const [activeColor, setActiveColor] = useState<string>(colors[0].status);

  return (
    <form className={styles.form}>
      <div className={styles.blocks}>
        <label>Выберите цвет</label>
        <div className={styles.colors}>
          {colors.map((color, index) => (
            <div
              onClick={() => setActiveColor(color.status)}
              key={index}
              className={cn(styles.roundIcon, styles[color.status], { [styles.active]: color.status === activeColor })}
            />
          ))}
        </div>
      </div>
      <div className={styles.blocks}>
        <label>Название доски</label>
        <Input placeholder='Введите название' className={styles.inp} />
      </div>
    </form>
  );
};
