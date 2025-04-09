import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from 'common/ui';
import { useGetHistoryQuery } from 'api/admin/history/history.api';
import { ChangeGroup } from './ChangeGroup';
import styles from './styles.module.scss';

export const History = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [verticalLineHeight, setVerticalLineHeight] = useState<number>(0);
  const { search } = useLocation();
  const { data, isFetching } = useGetHistoryQuery(search.substring(1));

  useEffect(() => {
    if (ref.current) {
      setVerticalLineHeight(ref.current?.scrollHeight);
    }
  }, []);

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.change_history} ref={ref}>
        <div className={styles.vertical_line} style={{ height: verticalLineHeight }}></div>
        {data && Object.keys(data).map((date, index) => <ChangeGroup key={index} date={date} changes={data[date]} isFirst={index === 0} />)}
      </div>
    </Loading>
  );
};
