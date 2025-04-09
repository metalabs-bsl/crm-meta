import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Button, SearchInput, Select } from 'common/ui';
import { AccessChangeble, EdgeModal } from 'common/components';
import { useAppDispatch, useAppSelector, useNotify, useRedirect } from 'common/hooks';
import { crmChapters, MESSAGE } from 'common/constants';
import { useGetAppSettingsQuery, useUpdateAppSettingsMutation } from 'api/admin/appSettings/appSettings.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useLazyGetLeadsForTodoQuery, useLazySearchLeadsQuery } from 'api/admin/leads/endpoints/lead';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
import { Options } from 'types/common';
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
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data } = useGetAppSettingsQuery();
  const [updateAppSettings, { isLoading }] = useUpdateAppSettingsMutation();
  const { role } = useAppSelector(employeesSelectors.employees);
  const [isActiveTab, setIsActiveTab] = useState<DEALS_TABS>(DEALS_TABS.kanban);
  const [wsDataType, setWsDataType] = useState<string>(options[0].value as string);
  const [reminderCount, setReminderCount] = useState<number>(0);
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;
  const [getTodos, { data: TodoData, isFetching }] = useLazyGetLeadsForTodoQuery();
  const [getSearchedLeads, { data: searchData, isFetching: isSearchFetching }] = useLazySearchLeadsQuery();
  const redirect = useRedirect();

  useEffect(() => {
    if (wsDataType) {
      getTodos(wsDataType === '1' ? 'my' : 'all');
    }
  }, [getTodos, wsDataType]);

  useEffect(() => {
    if (TodoData) {
      const count = TodoData.find((i) => i.id === 'dueToday')?.leads_count;
      setReminderCount(count || 0);
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

  const onClickSearchValue = (id: string) => {
    redirect.crm({ chapter: crmChapters.transactions.chapter, search: id });
    dispatch(setChangeOpenEdgeModal(true));
  };

  const getDealsComponent = () => {
    const components: Record<DEALS_TABS, JSX.Element> = {
      [DEALS_TABS.kanban]: <KanbanChapter dataType={wsDataType} />,
      [DEALS_TABS.list]: <List dataType={wsDataType} />,
      [DEALS_TABS.todos]: <Todos data={TodoData} isFetching={isFetching} />
    };
    return components[isActiveTab];
  };

  const updateAccessSettings = () => {
    if (data) {
      updateAppSettings({ is_calculator_open: !data.is_calculator_open })
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
        });
    }
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
          {isManagement && (
            <Select
              defaultValue={options[0].value}
              options={options}
              className={styles.filterSelect}
              onChange={(e) => setWsDataType(e.target.value)}
            />
          )}
          <SearchInput
            placeholder='Поиск'
            showCoincidences
            onCoincidencesClick={onClickSearchValue}
            onValueChange={(text) => getSearchedLeads(text)}
            coincidenceOptions={searchData}
            coincidenceLoading={isSearchFetching}
          />
        </div>
      </div>
      <div className={styles.access_block}>
        <DealsTabFilter setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} mainTabs={mainTabs} reminderCount={reminderCount} />
        {isManagement && (
          <AccessChangeble isLoading={isLoading} isAccess={data?.is_calculator_open} onUpdateAccess={updateAccessSettings} />
        )}
      </div>
      <div className={cn(styles.deal_content)}>{getDealsComponent()}</div>
      <EdgeModal>
        <CardDetail />
      </EdgeModal>
    </div>
  );
};
