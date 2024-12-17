import { useEffect, useState } from 'react';
import dayjs, { extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import cn from 'classnames';
import { Button, Icon, Loading } from 'common/ui';
import { Modal } from 'common/components/Modal';
import { useNotify } from 'common/hooks';
import {
  useEndMutation,
  useGetWorkTimeInfoQuery,
  usePauseMutation,
  useStartMutation,
  useUnPauseMutation
} from 'api/admin/workTime/workTime.api';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';
extend(duration);
extend(utc);
export const StartWindow = () => {
  const notify = useNotify();
  const { data, isFetching } = useGetWorkTimeInfoQuery();
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [start] = useStartMutation();
  const [end] = useEndMutation();
  const [pause] = usePauseMutation();
  const [unpause] = useUnPauseMutation();
  const [currentWorkTime, setCurrentWorkTime] = useState<string>('00:00:00');
  const [pauseTime, setPauseTime] = useState<string>('00:00:00');
  const [isOneHourPause, setIsOneHourPause] = useState<boolean>(false);
  const [isStopModal, setIsStopModal] = useState<boolean>(false);

  // этот useEffect отвечает за окрашивание таймера в красный если будет больше часа
  useEffect(() => {
    const redPauseTime = '00:59:59';
    const time1Obj = dayjs(`2024-01-01T${pauseTime}`);
    const time2Obj = dayjs(`2024-01-01T${redPauseTime}`);

    setIsOneHourPause(time1Obj.isAfter(time2Obj));
  }, [notify, pauseTime]);

  // этот useEffect отвечает за сопоставление текущего этапа сценария
  useEffect(() => {
    if (data && !isFetching) {
      setIsStart(!!data.work_day_started);
      setIsTimeOut(!!data.break_started);
    }
  }, [data, isFetching]);

  // этот useEffect отвечает за обновление рабочего времени
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (isStart && data?.work_day_started) {
      const updateCurrentWorkTime = () => {
        const now = dayjs().utc(true);
        const start = dayjs(data.work_day_started);
        // if (data.break_ended) {
        //   const breakDuration = dayjs.duration(dayjs(data.break_ended).diff(dayjs(data.break_started)));
        //   start = start.add(breakDuration);
        // }
        const workDuration = dayjs.duration(now.diff(start));
        const hours = String(workDuration.hours()).padStart(2, '0');
        const minutes = String(workDuration.minutes()).padStart(2, '0');
        const seconds = String(workDuration.seconds()).padStart(2, '0');
        setCurrentWorkTime(`${hours}:${minutes}:${seconds}`);
      };
      updateCurrentWorkTime();
      intervalId = setInterval(updateCurrentWorkTime, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isStart, data, isTimeOut]);

  const [notificationPlayed, setNotificationPlayed] = useState(false);

  // этот useEffect отвечает за обновление времени перерыва
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (data?.break_started && isTimeOut && !data.break_ended) {
      const updateCurrentPauseTime = () => {
        const now = dayjs().utc(true);
        const start = dayjs(data.break_started);
        const workDuration = dayjs.duration(now.diff(start));
        const hours = String(workDuration.hours()).padStart(2, '0');
        const minutes = String(workDuration.minutes()).padStart(2, '0');
        const seconds = String(workDuration.seconds()).padStart(2, '0');
        setPauseTime(`${hours}:${minutes}:${seconds}`);

        const breakEndTime = start.add(1, 'hour');
        const remainingDuration = dayjs.duration(breakEndTime.diff(now));

        if (remainingDuration.asMinutes() <= 15 && !notificationPlayed) {
          new Audio('/notification.mp3').play();
          setNotificationPlayed(true);
        }
      };
      updateCurrentPauseTime();
      intervalId = setInterval(updateCurrentPauseTime, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [notificationPlayed, isStart, data, isTimeOut, pauseTime, notify]);

  const onStart = () => {
    start()
      .unwrap()
      .then(() => setIsStart(true))
      .catch((e) => notify(e.data.message, 'error'));
  };

  const onStop = () => {
    data &&
      end(data.id)
        .unwrap()
        .then(() => {
          setIsStart(false);
          setCurrentWorkTime('00:00:00');
          onCloseStopModal();
        });
  };

  const onActivateTimeOut = () => {
    data &&
      pause(data.id)
        .unwrap()
        .then(() => {
          setIsTimeOut(true);
        })
        .catch((e) => notify(e.data.message, 'error'));
  };

  const onDeactivateTimeOut = () => {
    data &&
      unpause(data.id)
        .unwrap()
        .then(() => {
          setIsTimeOut(false);
        })
        .catch((e) => notify(e.data.message, 'error'));
  };

  const onCloseStopModal = () => {
    setIsStopModal(false);
  };

  const onOpenStopModal = () => {
    setIsStopModal(true);
  };

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.timeContent}>
        <div className={styles.startBlock}>
          {isStart ? (
            <Button text='завершить' styleType={BUTTON_TYPES.RED} onClick={onOpenStopModal} />
          ) : (
            <Button text='старт рабочего дня' styleType={BUTTON_TYPES.GREEN} onClick={onStart} />
          )}
        </div>

        <div className={styles.workTime}>
          <Icon type='start-line' alt='line' />
          {currentWorkTime}
          <Icon type='start-line' alt='line' />
        </div>
        {isStart && (
          <div className={styles.timeOutBlock}>
            {!data?.break_ended && isTimeOut ? (
              <span className={cn(styles.timer, { [styles.redTimer]: isOneHourPause })} onClick={onDeactivateTimeOut}>
                {pauseTime}
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
        {isStopModal && (
          <Modal
            isOpen={isStopModal}
            leftBtnText='завершить'
            leftBtnStyle={BUTTON_TYPES.YELLOW}
            leftBtnAction={onStop}
            rightBtnText='отменить'
            rightBtnStyle={BUTTON_TYPES.GRAY}
            rightBtnAction={onCloseStopModal}
            onClose={onCloseStopModal}
          >
            <p className={styles.stopModalText}>Вы уверены завершить рабочую смену?</p>
          </Modal>
        )}
      </div>
    </Loading>
  );
};
