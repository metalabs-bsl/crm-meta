import { useState } from 'react';
import { Button, Input } from 'common/ui';
import { DEALS_TABS, mainTabs } from './Deals.helper';
import { DealsTabFilter } from './DealsTabFilter';
import { Kanban } from './Kanban';
import { List } from './List';
import { Todos } from './Todos';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Deals = () => {
  const [isActiveTab, setIsActiveTab] = useState<DEALS_TABS>(DEALS_TABS.kanban);

  const getDealsComponent = () => {
    const components: Record<DEALS_TABS, JSX.Element> = {
      [DEALS_TABS.kanban]: <Kanban />,
      [DEALS_TABS.list]: <List />,
      [DEALS_TABS.todos]: <Todos />
    };
    return components[isActiveTab];
  };

  return (
    <div className={styles.deals}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Сделки</h1>
          <Button text='создать сделку' type={BUTTON_TYPES.YELLOW} onClick={() => console.log('create ')} className={styles.createBtn} />
        </div>
        <Input placeholder='Поиск' />
      </div>
      <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} />
      <div className={styles.deal_content}>{getDealsComponent()}</div>
    </div>
  );
};
