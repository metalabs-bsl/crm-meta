import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'common/ui';
import { Change } from '../../CardDetail.helper';
import { HISTORY_ITEMS } from '../History.helper';
import { Accounts, Comment, CreateDeal, Edit, Todo } from './DifferentContents';
import styles from '../styles.module.scss';

interface IProps {
  changes: Change;
  isFirstItem: boolean;
  isFirstGroup: boolean;
}
export const ChangeItem: FC<IProps> = ({ changes, isFirstItem, isFirstGroup }) => {
  const { status } = changes;
  const itemRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    if (isFirstItem && isFirstGroup && itemRef.current) {
      setLineHeight(itemRef.current.clientHeight);
    }
  }, [isFirstItem, isFirstGroup]);

  const getContent = () => {
    const components = {
      [HISTORY_ITEMS.Edit]: <Edit data={changes} />,
      [HISTORY_ITEMS.TODO]: <Todo data={changes} />,
      [HISTORY_ITEMS.COMMENT]: <Comment data={changes} />,
      [HISTORY_ITEMS.ACCOUNTS]: <Accounts data={changes} />,
      [HISTORY_ITEMS.DEAL_CREATE]: <CreateDeal data={changes} />
    };
    return components[status];
  };

  return (
    <div className={styles.change_item} ref={itemRef}>
      <div className={styles.horizontal_line}>
        <div className={styles.icon}>
          {isFirstGroup && isFirstItem && (
            <div className={styles.hidenLine} style={{ height: lineHeight + 5, top: `-${lineHeight}px` }}></div>
          )}
          <Icon type={status} />
        </div>
      </div>
      <div className={styles.change_content}>{getContent()}</div>
    </div>
  );
};
