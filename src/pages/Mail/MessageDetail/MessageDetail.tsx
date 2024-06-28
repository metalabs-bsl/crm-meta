import { Icon, Loading } from 'common/ui';
import styles from './styles.module.scss';

export const MessageDetail = () => {
  return (
    <Loading>
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
                подтвердила это. Я предполагаю, что пришельцы готовятся к наступлению и собирают войско неподалеку от северной границы
                страны. Предлагаю устроить внеплановый созвон всех командиров. Жду вашей обратной связи!
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
                подтвердила это. Я предполагаю, что пришельцы готовятся к наступлению и собирают войско неподалеку от северной границы
                страны. Предлагаю устроить внеплановый созвон всех командиров. Жду вашей обратной связи!
              </p>
              <span className={styles.author}>Ваш капитан Азат</span>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};
