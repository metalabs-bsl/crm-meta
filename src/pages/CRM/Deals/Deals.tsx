import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Options } from 'types/pages';
import { Button, SearchInput, Select } from 'common/ui';
import { AccessChangeble, EdgeModal } from 'common/components';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useGetLeadsForTodoQuery } from 'api/admin/leads/leads.api';
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

const options: Options[] = [
  { label: 'Мои сделки', value: '1' },
  { label: 'Общие сделки', value: '2' }
];

export const Deals = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data: TodoData, isFetching } = useGetLeadsForTodoQuery();
  const { role } = useAppSelector(employeesSelectors.employees);
  const [access, setAccess] = useState<boolean>(true);
  const [isActiveTab, setIsActiveTab] = useState<DEALS_TABS>(DEALS_TABS.kanban);
  const [wsDataType, setWsDataType] = useState<string>(options[0].value as string);
  const [searchValue, setSearchValue] = useState<string>('');
  const [reminderCount, setReminderCount] = useState<number>(0);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  useEffect(() => {
    if (TodoData) {
      setReminderCount(TodoData.reduce((a, b) => a + b.leads_count, 0));
    }
  }, [TodoData]);

  const onOpen = (isNewDeal: boolean) => {
    dispatch(setChangeOpenEdgeModal(true));
    dispatch(setIsNewDeal(isNewDeal));
  };

  useEffect(() => {
    if (location.search) {
      onOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  console.log(searchValue);

  const handleSearchValue = (id: string) => {
    setSearchValue(id);
  };

  const getDealsComponent = () => {
    const components: Record<DEALS_TABS, JSX.Element> = {
      [DEALS_TABS.kanban]: <KanbanChapter dataType={wsDataType} />,
      [DEALS_TABS.list]: <List dataType={wsDataType} />,
      [DEALS_TABS.todos]: <Todos data={TodoData} isFetching={isFetching} />
    };
    return components[isActiveTab];
  };

  return (
    <div className={styles.deals}>
      <div className={styles.headBlock}>
        <div className={styles.titleBlock}>
          <h1>Сделки</h1>
          {isActiveTab !== DEALS_TABS.todos && (
            <Button text='создать сделку' styleType={BUTTON_TYPES.YELLOW} onClick={() => onOpen(true)} className={styles.createBtn} />
          )}
        </div>
        <div className={styles.filterBlock}>
          {isManagement && isActiveTab !== DEALS_TABS.todos && (
            <Select
              defaultValue={options[0].value}
              options={options}
              className={styles.filterSelect}
              onChange={(e) => setWsDataType(e.target.value)}
            />
          )}
          <SearchInput placeholder='Поиск' showCoincidences onCoincidencesChange={handleSearchValue} />
        </div>
      </div>
      <div className={styles.access_block}>
        <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} reminderCount={reminderCount} />
        {isManagement && <AccessChangeble isAccess={access} setIsAccess={setAccess} isDeal={true} />}
      </div>
      <div className={cn(styles.deal_content)}>{getDealsComponent()}</div>
      <EdgeModal>
        <CardDetail />
      </EdgeModal>
    </div>
  );
};
