import { useNavigate } from 'react-router-dom';
import { Button } from 'common/ui';
import errorImg from '../../common/assets/images/404.png';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <div className={styles.inner}>
        <div className={styles.img}>
          <img src={errorImg} alt='ERROR' />
        </div>
        <span className={styles.text}>Страница не найдена</span>
        <Button styleType={BUTTON_TYPES.GREEN} text='Вернуться на главную' onClick={() => navigate('/')} />
        <span className={styles.leftTopDote}></span>
        <span className={styles.rightBottomDote}></span>
        <span className={styles.rightTopPlus}></span>
        <span className={styles.leftBottomPlus}></span>
      </div>
    </div>
  );
};
