import { FC } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { backgroundSelectors } from 'api/admin/background/background.selectors';
import { setBg } from 'api/admin/background/background.slice';
import styles from '../styles.module.scss';

import { BG_TYPES } from 'types/enums';

interface IProps {
  title: string;
  backgrounds: BG_TYPES[];
}

export const BgCards: FC<IProps> = ({ title, backgrounds }) => {
  const dispatch = useAppDispatch();
  const { bgType } = useAppSelector(backgroundSelectors.background);

  const onChangeBg = (color: BG_TYPES) => {
    dispatch(setBg(color));
  };

  return (
    <>
      <span className={styles.title}>{title}</span>
      <div className={styles.blocks}>
        {backgrounds.map((color, index) => (
          <div className={cn(styles.card, styles[color], styles.texture)} key={index} onClick={() => onChangeBg(color)}>
            {bgType === color && <Icon type='active-bg' alt='checkIcon' />}
          </div>
        ))}
      </div>
    </>
  );
};
