import { useState } from 'react';
import { Button, Input } from 'common/ui';
import { EdgeModal } from 'common/components';
import { CardDetail } from './CardDetail';
import { DEALS_TABS, KanbanData, kanbanKolumns, mainTabs, TodoData, todoKolumns } from './Deals.helper';
import { DealsTabFilter } from './DealsTabFilter';
import { Kanban } from './Kanban';
import { List } from './List';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Deals = () => {
  const [isActiveTab, setIsActiveTab] = useState<DEALS_TABS>(DEALS_TABS.kanban);
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };
  const getDealsComponent = () => {
    const components: Record<DEALS_TABS, JSX.Element> = {
      [DEALS_TABS.kanban]: <Kanban data={KanbanData} columns={kanbanKolumns} />,
      [DEALS_TABS.list]: <List />,
      [DEALS_TABS.todos]: <Kanban data={TodoData} columns={todoKolumns} />
    };
    return components[isActiveTab];
  };

  return (
    <div className={styles.deals}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Сделки</h1>
          <Button text='создать сделку' styleType={BUTTON_TYPES.YELLOW} onClick={() => setOpen(true)} className={styles.createBtn} />
        </div>
        <Input placeholder='Поиск' isSearch />
      </div>
      <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} />
      <div className={styles.deal_content}>{getDealsComponent()}</div>
      <EdgeModal isOpen={open} onClose={onClose}>
        <CardDetail />
      </EdgeModal>
    </div>
  );
};
