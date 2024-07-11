import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon, Input, Loading } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useAppSelector, useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useLazyGetLeadQuery, useUpdateLeadMutation } from 'api/admin/leads/leads.api';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { ICreateLeadParams } from 'types/entities';
import { AboutDeal } from './AboutDeal';
import { history } from './CardDetail.helper';
import { History } from './History';
import { Progress } from './Progress';
import styles from './style.module.scss';

const tabItems: ITabsItem[] = [
  {
    title: 'О сделке',
    type: 'about-deals'
  },
  {
    title: 'История изменений',
    type: 'history-of-changes'
  },
  {
    title: 'WhatsApp',
    type: 'whatsApp'
  }
];

export const CardDetail = () => {
  const notify = useNotify();
  const { search } = useLocation();
  const { isNewDeal } = useAppSelector(sidebarSelectors.sidebar);
  const [getLeadDetail, { isFetching, data }] = useLazyGetLeadQuery();
  const [updateLead, { isLoading }] = useUpdateLeadMutation();
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('Наименование');
  const [formData, setFormData] = useState<ICreateLeadParams>();

  useEffect(() => {
    if (data) {
      const { responsible_employee, customer, lead_column, lead_name, source } = data;
      const updatedData = {
        responsible_employee_id: responsible_employee.id,
        lead_name,
        customer_name: customer.fullname,
        customer_phone: customer.phone,
        customer_DOB: customer.date_of_birth,
        customer_id: customer.id,
        city: customer.city,
        source_id: source.id,
        column_id: lead_column.id
      };
      setFormData(updatedData);
      setEditedTitle(data.lead_name);
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      const leadId = search.substring(1);
      getLeadDetail(leadId);
    }
  }, [getLeadDetail, search]);

  const getComponent = (type: string) => {
    const components = {
      [tabItems[0].type]: (
        <AboutDeal formData={formData} reminders={data?.reminders} comments={data?.comments} calcData={data?.calculator[0]} />
      ),
      [tabItems[1].type]: <History history={history} />,
      [tabItems[2].type]: <p>WhatsApp</p>
    };
    return components[type];
  };

  const onSaveTitleEdit = () => {
    if (data && formData) {
      updateLead({ id: data.id, body: { ...formData, lead_name: editedTitle } });
      setIsTitleEdit(false);
    }
  };

  const onLinkCopy = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => notify(MESSAGE.LINK_COPIED))
      .catch(() => notify(MESSAGE.ERROR, 'error'));
  };

  return (
    <Loading isSpin={isFetching || isLoading}>
      <div className={cn(styles.cardDetail, { [styles.isNewDeal]: isNewDeal })}>
        <div className={styles.head}>
          <div className={styles.head_left}>
            {isTitleEdit ? (
              <Input
                className={styles.editInp}
                defaultValue={data?.lead_name}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSaveTitleEdit()}
              />
            ) : (
              <>
                <div className={styles.card_title}>{editedTitle}</div>
                <Icon type='edit' onClick={() => setIsTitleEdit(true)} />
                <Icon type='link' onClick={onLinkCopy} />
              </>
            )}
          </div>
          <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
        </div>
        <div>
          <Progress currentStage={data?.lead_column.id} lead_id={data?.id} />
        </div>
        <div className={styles.content}>{getComponent(isActiveTab)}</div>
      </div>
    </Loading>
  );
};
