import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'common/ui';
import { Change, IChangeItemStatus } from 'types/entities';
import { HISTORY_ITEMS } from '../History.helper';
import { Accounts, Comment, Deal, Edit, Todo } from './DifferentContents';
import styles from '../styles.module.scss';

interface IProps {
  change: Change;
  isFirstItem: boolean;
  isFirstGroup: boolean;
}
export const ChangeItem: FC<IProps> = ({ change, isFirstItem, isFirstGroup }) => {
  const { status } = change;
  const itemRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    if (isFirstItem && isFirstGroup && itemRef.current) {
      setLineHeight(itemRef.current.clientHeight);
    }
  }, [isFirstItem, isFirstGroup]);

  const getContent = (status: IChangeItemStatus) => {
    const components = {
      [HISTORY_ITEMS.Edit]: <Edit data={change} />,
      [HISTORY_ITEMS.TODO]: <Todo data={change} />,
      [HISTORY_ITEMS.COMMENT]: <Comment data={change} />,
      [HISTORY_ITEMS.ACCOUNTS]: <Accounts data={change} />,
      [HISTORY_ITEMS.DEAL]: <Deal data={change} />
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
      <div className={styles.change_content}>{getContent(status)}</div>
    </div>
  );
};
