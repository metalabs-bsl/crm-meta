import { useState } from 'react';
import cn from 'classnames';
import { Options } from 'types/pages';
import { Button, SearchInput, Select } from 'common/ui';
import { AccessChangeble, EdgeModal } from 'common/components';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import { CardDetail } from './CardDetail';
import { DEALS_TABS, mainTabs } from './Deals.helper';
import { DealsTabFilter } from './DealsTabFilter';
import { KanbanChapter } from './KanbanChapter';
import { List } from './List';
import { Todos } from './Todos';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Deals = () => {
  const { role } = useAppSelector(employeesSelectors.employees);
  const [isActiveTab, setIsActiveTab] = useState<DEALS_TABS>(DEALS_TABS.kanban);
  const dispatch = useAppDispatch();
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;
  const [access, setAccess] = useState<boolean>(true);

  const onOpen = () => {
    dispatch(setChangeOpenEdgeModal(true));
    dispatch(setIsNewDeal(true));
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
          {isActiveTab !== DEALS_TABS.todos && (
            <Button text='создать сделку' styleType={BUTTON_TYPES.YELLOW} onClick={onOpen} className={styles.createBtn} />
          )}
        </div>
        <div className={styles.filterBlock}>
          {isManagement && <Select options={options} className={styles.filterSelect} />}
          <SearchInput placeholder='Поиск' />
        </div>
      </div>
      <div className={styles.access_block}>
        <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} />
        {isManagement && <AccessChangeble isAccess={access} setIsAccess={setAccess} />}
      </div>
      <div className={cn(styles.deal_content, { [styles.isDisabled]: !access })}>{getDealsComponent()}</div>
      <EdgeModal>
        <CardDetail />
      </EdgeModal>
    </div>
  );
};
