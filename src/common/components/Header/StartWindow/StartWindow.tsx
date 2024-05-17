import { useState } from 'react';
import { Button, Icon } from 'common/ui';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const StartWindow = () => {
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);

  const onStart = () => {
    setIsStart(true);
  };

  const onStop = () => {
    setIsStart(false);
  };

  const onActivateTimeOut = () => {
    setIsTimeOut(true);
  };

  const onDeactivateTimeOut = () => {
    setIsTimeOut(false);
  };

  return (
    <div className={styles.timeContent}>
      <div className={styles.startBlock}>
        {isStart ? (
          <Button text='завершить' type={BUTTON_TYPES.RED} onClick={onStop} />
        ) : (
          <Button text='старт рабочего дня' type={BUTTON_TYPES.GREEN} onClick={onStart} />
        )}
      </div>

      <span className={styles.workTime}>00:00</span>
      {isStart && (
        <div className={styles.timeOutBlock}>
          {isTimeOut ? (
            <span className={styles.timer} onClick={onDeactivateTimeOut}>
              00:59
            </span>
          ) : (
            <Button
              icon={<Icon type='timeout-playIcon' alt='timeout' />}
              text='перерыв'
              type={BUTTON_TYPES.OUTLINE_GRAY}
              onClick={onActivateTimeOut}
            />
          )}
        </div>
      )}
    </div>
  );
};
