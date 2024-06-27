import { FC } from 'react';
import { Icon } from 'common/ui';
// import { Button, Loading, SearchInput } from 'common/ui';
// import { Tabs } from 'common/components';
// import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
// import { MessageTable } from './MessageTable';
import styles from './styles.module.scss';

// import { BUTTON_TYPES } from 'types/enums';

// const mailTabs: ITabsItem[] = [
//   {
//     title: 'Входящие',
//     type: 'inbox',
//     badgeCount: 1,
//     hasBadge: true
//   },
//   {
//     title: 'Непрочитанные',
//     type: 'unread',
//     badgeCount: 2,
//     hasBadge: true
//   },
//   {
//     title: 'Отправленные',
//     type: 'sent',
//     badgeCount: 0,
//     hasBadge: true
//   }
// ];

// const messages = [
//   { id: 1, sender: 'John Doe', text: 'Hello World', date: '2024-06-05T00:00', unread: true, pick: false, checked: false },
//   { id: 2, sender: 'Jane Smith', text: 'React is awesome!', date: '2024-06-04T00:00', unread: false, pick: true, checked: false }
// ];

// const columns = ['отправитель', 'сообщение', 'дата'];

export const Mail: FC = () => {
  // const [activeTab, setActiveTab] = useState<string>(mailTabs[0].type);

  return (
    // <Loading>
    //   <div className={styles.mail}>
    //     <div className={styles.headBlock}>
    //       <div className={styles.titleBlock}>
    //         <h1>Почта</h1>
    //         <Button text='написать сообщение' styleType={BUTTON_TYPES.YELLOW} />
    //       </div>
    //       <SearchInput placeholder='Поиск' />
    //     </div>
    //     <Tabs
    //       tabItems={mailTabs}
    //       isActiveTab={activeTab}
    //       setIsActiveTab={setActiveTab}
    //       className={styles.tabs}
    //       tabClassName={styles.tab}
    //       activeTabClassName={styles.activeTab}
    //     />
    //     <div className={styles.tableWrapper}>
    //       <MessageTable messages={messages} columns={columns} />
    //     </div>
    //   </div>
    // </Loading>
    <div className={styles.message}>
      <div className={styles.messageHead}>
        <a href='#'>
          <Icon type='go-back' />
        </a>
        <h1>Пришельцы решили действовать!</h1>
        <div className={styles.btnWrapper}>
          <div className={styles.btnInner}>
            <Icon className={`${styles.btn} ${styles.btnCancel}`} type='sms-gray' />
            <span className={`${styles.btnText} ${styles.cancel}`}>Отметить как непрочитанно</span>
          </div>
          <div className={styles.btnInner}>
            <Icon className={`${styles.btn} ${styles.btnDelete}`} type='trash-gray' />
            <span className={`${styles.btnText} ${styles.delete}`}>Удалить</span>
          </div>
        </div>
      </div>
      <div className={styles.messageBody}>
        <div className={styles.card}>
          <div className={styles.imgWrapper}>
            <span>img</span>
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              <div className={styles.about}>
                <span className={styles.name}>Азатов Азат Азатович</span>
                <span className={styles.email}>azatovaza@gmail.com</span>
              </div>
              <div className={styles.dateWrapper}>
                <span>ср, 5 июня 2024, 18:30</span>
              </div>
            </div>
            <p className={styles.contentText}>
              Уважаемые коллеги, у меня плохие новости. Группа пришельцев была замечена у границ страны Вэст. Моя разведывательная группа
              подтвердила это. Я предполагаю, что пришельцы готовятся к наступлению и собирают войско неподалеку от северной границы страны.
              Предлагаю устроить внеплановый созвон всех командиров. Жду вашей обратной связи!
            </p>
            <span className={styles.author}>Ваш капитан Азат</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgWrapper}>
            <span>img</span>
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              <div className={styles.about}>
                <span className={styles.name}>Азатов Азат Азатович</span>
                <span className={styles.email}>azatovaza@gmail.com</span>
              </div>
              <div className={styles.dateWrapper}>
                <span>ср, 5 июня 2024, 18:30</span>
              </div>
            </div>
            <p className={styles.contentText}>
              Уважаемые коллеги, у меня плохие новости. Группа пришельцев была замечена у границ страны Вэст. Моя разведывательная группа
              подтвердила это. Я предполагаю, что пришельцы готовятся к наступлению и собирают войско неподалеку от северной границы страны.
              Предлагаю устроить внеплановый созвон всех командиров. Жду вашей обратной связи!
            </p>
            <span className={styles.author}>Ваш капитан Азат</span>
          </div>
        </div>
      </div>
    </div>
  );
};
