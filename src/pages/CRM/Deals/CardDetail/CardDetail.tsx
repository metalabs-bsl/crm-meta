import { FC, useState } from 'react';
import { Icon } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { Progress } from './Progress';
import styles from './style.module.scss';

interface IProps {
  cardTitle: string;
}

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

export const CardDetail: FC<IProps> = ({ cardTitle }) => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);

  return (
    <div className={styles.cardDetail}>
      <div className={styles.head}>
        <div className={styles.head_left}>
          <div className={styles.card_title}>{cardTitle}</div>
          <Icon type='edit' />
          <Icon type='link' />
        </div>
        <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
      </div>
      <Progress currentStage='received' />
    </div>
  );
};
