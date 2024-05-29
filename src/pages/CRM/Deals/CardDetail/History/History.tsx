import React, { useEffect, useRef, useState } from 'react';
import { Change } from '../CardDetail.helper';
import { ChangeGroup } from './ChangeGroup';
import styles from './styles.module.scss';

interface ChangeHistoryProps {
  history: Record<string, Change[]>;
}

export const History: React.FC<ChangeHistoryProps> = ({ history }) => {
  const dates = Object.keys(history);
  const ref = useRef<HTMLDivElement>(null);
  const [verticalLineHeight, setVerticalLineHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current?.scrollHeight);

      setVerticalLineHeight(ref.current?.scrollHeight);
    }
  }, []);

  return (
    <div className={styles.change_history} ref={ref}>
      <div className={styles.vertical_line} style={{ height: verticalLineHeight }}></div>
      {dates.map((date, index) => (
        <ChangeGroup key={index} date={date} changes={history[date]} isFirst={index === 0} />
      ))}
    </div>
  );
};
