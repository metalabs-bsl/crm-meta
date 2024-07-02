import { Button } from 'common/ui';
import errorImg from './accets/error.svg';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const ErrorMessage = () => {
  return (
    <div className={styles.error}>
      <div className={styles.inner}>
        <div className={styles.img}>
          <img src={errorImg} alt='ERROR' />
        </div>
        <span className={styles.text}>Страница не найдена</span>
        <Button styleType={BUTTON_TYPES.GREEN} text='Вернуться на главную' />
        <span className={styles.leftTopDote}></span>
        <span className={styles.rightBottomDote}></span>
        <span className={styles.rightTopPlus}></span>
        <span className={styles.leftBottomPlus}></span>
      </div>
    </div>
  );
};
