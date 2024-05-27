import { FC, useState } from 'react';
import { Icon, Input } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { AboutDeal } from './AboutDeal';
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
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(cardTitle);

  const getComponent = (type: string) => {
    const components = {
      [tabItems[0].type]: <AboutDeal />,
      [tabItems[1].type]: <p>История изменений</p>,
      [tabItems[2].type]: <p>WhatsApp</p>
    };
    return components[type];
  };

  const onSaveTitleEdit = () => {
    setIsTitleEdit(false);
  };

  return (
    <div className={styles.cardDetail}>
      <div className={styles.head}>
        {isTitleEdit ? (
          <Input
            className={styles.editInp}
            defaultValue={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSaveTitleEdit()}
          />
        ) : (
          <div className={styles.head_left}>
            <div className={styles.card_title}>{editedTitle}</div>
            <Icon type='edit' onClick={() => setIsTitleEdit(true)} />
            <Icon type='link' />
          </div>
        )}
        <Tabs tabItems={tabItems} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
      </div>
      <Progress currentStage='processed' />
      <div>{getComponent(isActiveTab)}</div>
    </div>
  );
};
