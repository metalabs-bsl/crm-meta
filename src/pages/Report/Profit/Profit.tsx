import { useState } from 'react';
import { StartEndPeriodPicker } from 'pages/CRM/Start/Personal/StartEndPeriodPicker';
import { Button } from 'common/ui';
import { Empty } from 'common/ui/Empty';
import { Tabs } from 'common/components';
import { ProfitTable } from './ProfitTable/ProfitTable';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';
// import { send } from 'process';

const tabItems = [
  { type: 'tab1', title: 'Сотрудники' },
  { type: 'tab2', title: 'Общий' }
];

export interface ProfitData {
  title: string;
  status: string;
}

const data: ProfitData[] = [
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // },
  // {
  //   title: 'Курманбеков Марлен Сатарбекович',
  //   status: 'Руководитель-менеджер'
  // }
];

export const Profit = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].type);
  const [startDate, setStartDate] = useState<string>('2024-06-01T00:00');
  const [endDate, setEndDate] = useState<string>('2024-06-30T00:00');

  return (
    <div className={styles.profit}>
      <div className={styles.heading}>
        <div className={styles.titleWrapper}>
          <h1>Прибыль</h1>
          <Tabs
            tabItems={tabItems}
            isActiveTab={activeTab}
            setIsActiveTab={setActiveTab}
            className={styles.customTabsBlock}
            tabClassName={styles.customTab}
            activeTabClassName={styles.customActiveTab}
          />
        </div>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarPeriod}>
            <StartEndPeriodPicker startValue={startDate} endValue={endDate} onChangeStart={setStartDate} onChangeEnd={setEndDate} />
          </div>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        {activeTab === 'tab1' && <>{data.length ? <ProfitTable data={data} /> : <Empty />}</>}
        {activeTab === 'tab2' && (
          <>
            {data.length ? (
              <div className={styles.commonWrapper}>
                <div className={styles.common}>
                  <p className={styles.commonText}>Отчет по общей прибыли сотрудников</p>
                  <div className={styles.commonBtnWrapper}>
                    <a href='#' download>
                      <Button styleType={BUTTON_TYPES.GREEN} className={styles.greenBTn} text='Выгрузить в PDF' />
                    </a>
                    <a href='#' className={styles.commonDownload} download>
                      Выгрузить в Excel
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
    </div>
  );
};
