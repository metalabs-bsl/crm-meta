import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Button, Loading } from 'common/ui';
import { AccessChangeble, Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useAppSelector, useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useGenerateDocumentMutation } from 'api/admin/calculator/calculator.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useLazyGetLeadCalcQuery, useUpdateLeadCalcAccessMutation } from 'api/admin/leads/endpoints/calculator';
import { IComment, ICreateLeadParams, ICreateReminderParams } from 'types/entities';
import { ICalculator } from 'types/entities/leads';
import { ROLES } from 'types/roles';
import { TAB_COMPONENTS } from './AboutDeal.helper';
import { Accounts } from './Accounts';
import { Calculator } from './Calculator';
import { DealsForm } from './DealsForm';
import { Todo } from './Todo';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  formData?: ICreateLeadParams;
  reminders?: ICreateReminderParams[];
  comments?: IComment[];
  customerPhone?: string;
  calcData?: ICalculator;
  colStatus?: number;
}

export const AboutDeal: FC<IProps> = ({ formData, reminders, comments, calcData, colStatus, customerPhone }) => {
  const notify = useNotify();
  const [updateCalcAccess, { isLoading }] = useUpdateLeadCalcAccessMutation();
  const { role } = useAppSelector(employeesSelectors.employees);
  const [getCalc, { data, isFetching }] = useLazyGetLeadCalcQuery();
  const { search } = useLocation();
  const [generateDocument, { isLoading: isDocumentLoading }] = useGenerateDocumentMutation();

  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    if (search) {
      const extractedLeadId = search.substring(1);
      setLeadId(extractedLeadId);
      getCalc(extractedLeadId);
    }
  }, [getCalc, search]);

  const tabItems: ITabsItem[] = [
    {
      title: 'Дело',
      type: TAB_COMPONENTS.TODO,
      disabled: false
    },
    {
      title: 'Счета',
      type: TAB_COMPONENTS.ACCOUNT,
      disabled: !(data?.additionalPayments?.length || data?.paymentData?.length)
    },
    {
      title: 'Калькулятор',
      type: TAB_COMPONENTS.CALCULATOR,
      disabled: false
    }
  ];

  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const isCalculatorTab = isActiveTab === TAB_COMPONENTS.CALCULATOR;
  const isManagement = role === ROLES.DIRECTOR || role === ROLES.SENIOR_MANAGER;

  const getActiveComponent = () => {
    const component = {
      [TAB_COMPONENTS.TODO]: <Todo reminders={reminders} comments={comments} customerPhone={customerPhone} />,
      [TAB_COMPONENTS.ACCOUNT]: <Accounts />,
      [TAB_COMPONENTS.CALCULATOR]: <Calculator calcData={calcData} data={data} />
    };
    return component[isActiveTab as TAB_COMPONENTS];
  };
  const changeAccess = () => {
    if (calcData) {
      updateCalcAccess(calcData.id)
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
        });
    }
  };

  const handleGenerateDocument = () => {
    if (leadId) {
      generateDocument(leadId)
        .unwrap()
        .then((response) => {
          if (response instanceof Blob) {
            const url = window.URL.createObjectURL(response);
            sessionStorage.setItem('documentDownloadUrl', url);
            window.location.href = url;
            notify('Документ успешно создан и загружен.', 'success');
          }
        })
        .catch((error) => {
          console.error('Error generating document:', error);
          notify('Ошибка при создании документа.', 'error');
        });
    } else {
      notify('ID сделки не найден.', 'error');
    }
  };

  return (
    <Loading isSpin={isFetching}>
      <div className={styles.aboutDeal}>
        {!isCalculatorTab && <DealsForm formProps={formData} colStatus={colStatus} dateCreated={data?.created_at} />}
        <div className={cn(styles.rightBlock, { [styles.isCalculatorChild]: isCalculatorTab })}>
          <div className={cn(styles.wrapper, { [styles.isOnlyTab]: !isCalculatorTab })}>
            {isCalculatorTab && (
              <div className={styles.btns_wrapper}>
                {isManagement && (
                  <AccessChangeble
                    isAccess={!calcData?.is_closed}
                    isLoading={isLoading}
                    onUpdateAccess={changeAccess}
                    currentStage={colStatus}
                    // userRole={role}
                  />
                )}
                <Button
                  text='Создать договор'
                  onClick={handleGenerateDocument}
                  styleType={BUTTON_TYPES.LINK_GRAY}
                  disabled={isDocumentLoading}
                />
              </div>
            )}
            <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
          </div>
          <div className={cn(styles.box, { [styles.isDisabled]: isCalculatorTab && calcData?.is_closed })}>{getActiveComponent()}</div>
        </div>
      </div>
    </Loading>
  );
};
