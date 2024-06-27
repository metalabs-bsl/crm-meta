import { useState } from 'react';
import { Options } from 'types/pages';
import { Button, SearchInput, Select } from 'common/ui';
import { EdgeModal } from 'common/components';
import { CardDetail } from './CardDetail';
import { DEALS_TABS, mainTabs } from './Deals.helper';
import { DealsTabFilter } from './DealsTabFilter';
import { KanbanChapter } from './KanbanChapter';
import { List } from './List';
import { Todos } from './Todos';
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
      [DEALS_TABS.kanban]: <KanbanChapter />,
      [DEALS_TABS.list]: <List />,
      [DEALS_TABS.todos]: <Todos data={[]} />
    };
    return components[isActiveTab];
  };

  const options: Options[] = [
    { label: 'Мои сделки', value: 1 },
    { label: 'Общие сделки', value: 2 }
  ];

  return (
    <div className={styles.deals}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Сделки</h1>
          <Button text='создать сделку' styleType={BUTTON_TYPES.YELLOW} onClick={() => setOpen(true)} className={styles.createBtn} />
        </div>
        <div className={styles.filterBlock}>
          <Select options={options} className={styles.filterSelect} />
          <SearchInput placeholder='Поиск' />
        </div>
      </div>
      <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} />
      <div className={styles.deal_content}>{getDealsComponent()}</div>
      <EdgeModal isOpen={open} onClose={onClose}>
        <CardDetail isNewDeal />
      </EdgeModal>
    </div>
  );
};
