import { useState } from 'react';
import { Button, Icon } from 'common/ui';
import { useNotify } from 'common/hooks';
import { useEndMutation, useGetWorkTimeInfoQuery, useStartMutation } from 'api/admin/workTime/workTime.api';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const StartWindow = () => {
  const notify = useNotify();
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [start] = useStartMutation();
  const [end] = useEndMutation();
  const { data } = useGetWorkTimeInfoQuery();

  const onStart = () => {
    setIsStart(true);
    start()
      .unwrap()
      .then(() => setIsStart(true))
      .catch((e) => notify(e.data.message, 'error'));
  };

  const onStop = () => {
    setIsStart(false);
    data && end(data.id).unwrap();
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
          <Button text='завершить' styleType={BUTTON_TYPES.RED} onClick={onStop} />
        ) : (
          <Button text='старт рабочего дня' styleType={BUTTON_TYPES.GREEN} onClick={onStart} />
        )}
      </div>

      <div className={styles.workTime}>
        <Icon type='start-line' alt='line' />
        00:00
        <Icon type='start-line' alt='line' />
      </div>
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
              styleType={BUTTON_TYPES.OUTLINE_GRAY}
              onClick={onActivateTimeOut}
            />
          )}
        </div>
      )}
    </div>
  );
};
