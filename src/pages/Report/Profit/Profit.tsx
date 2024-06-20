import { useState } from 'react';
import { Icon } from 'common/ui';
import { Empty } from 'common/ui/Empty';
// import { Empty } from 'common/ui/Empty';
import { Tabs } from 'common/components';
import { ProfitTable } from './ProfitTable/ProfitTable';
import styles from './styles.module.scss';

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
  const [calendar, setCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState(tabItems[0].type);

  const handleClickCalendar = () => {
    setCalendar((prev) => !prev);
  };

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

        {/*-- сюда нужно поставить компонент 'Отчетный период: c - по', который сделает Михаил --*/}
        {/* -----------------------------||----------------------------------- */}
        {/* -----------------------------||------------------------------------ */}
        {/* ----------------------------\\//---------------------------------- */}
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarPeriod}>
            <span className={styles.periodText}>
              Отчетный период:
              <span className={styles.periodLetters}>с</span>
              <span className={styles.periodData}>10.10.10</span>
              <span className={styles.periodLetters}>по</span>
              <span className={styles.periodData}>10.10.10</span>
            </span>
          </div>
          <div className={styles.calendar}>
            <button onClick={handleClickCalendar} className={styles.calendarBtn}>
              Выбрать отчетный период
              <Icon type='black-border-calendar' />
            </button>
            <div className={`${styles.calendarContent} ${calendar ? styles.calendarContentActive : ''}`}>
              <div className={styles.calendarInner}>
                <span>Начало</span>
                <span className={styles.calendarData}>12.05.2024</span>
              </div>
              <div className={styles.calendarInner}>
                <span>Конец</span>
                <span className={styles.calendarData}>12.05.2024</span>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------------------//\\----------------------------------- */}
        {/* -----------------------------||------------------------------------ */}
        {/* -----------------------------||------------------------------------ */}
      </div>
      <div className={styles.tableWrapper}>
        {activeTab === 'tab1' && <>{data.length ? <ProfitTable data={data} /> : <Empty />}</>}
        {activeTab === 'tab2' && (
          <>
            {data.length ? (
              <div className={styles.commonWrapper}>
                <div className={styles.common}>
                  <p className={styles.commonText}>Отчет по общей прибыли сотрудников</p>
                  <a href='#' className={styles.commonDownload} download>
                    Выгрузить в Excel
                  </a>
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
