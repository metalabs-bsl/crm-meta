import { useState } from 'react';
import { Icon } from 'common/ui';
import { Tabs } from 'common/components';
import { ProfitTable } from './ProfitTable/ProfitTable';
import styles from './styles.module.scss';

const tabItems = [
  { type: 'tab1', title: 'Сотрудники' },
  { type: 'tab2', title: 'Общий' }
];

const data = [
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  },
  {
    title: 'Курманбеков Марлен Сатарбекович',
    status: 'Руководитель-менеджер'
  }
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
        <ul className={styles.calendarWrapper}>
          <li className={styles.calendarPeriod}>
            <span className={styles.periodText}>
              Отчетный период:
              <span className={styles.periodLetters}>с</span>
              <span className={styles.periodData}>10.10.10</span>
              <span className={styles.periodLetters}>по</span>
              <span className={styles.periodData}>10.10.10</span>
            </span>
          </li>
          <li className={styles.calendar}>
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
          </li>
        </ul>
      </div>
      <div className={styles.tableWrapper}>
        {activeTab === 'tab1' && <ProfitTable data={data} />}
        {activeTab === 'tab2' && (
          <div className={styles.commonWrapper}>
            <div className={styles.common}>
              <p className={styles.commonText}>Отчет по общей прибыли сотрудников</p>
              <label htmlFor='excel' className={styles.commonDownload}>
                Выгрузить в Excel
              </label>
              <input type='file' id='excel' accept='image/*' className={styles.avatarInput} hidden />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
