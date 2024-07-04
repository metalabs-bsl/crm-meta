import { FC, useState } from 'react';
import cn from 'classnames';
import { Icon, Input } from 'common/ui';
import { Tabs } from 'common/components';
import { ITabsItem } from 'common/components/Tabs/Tabs.helper';
import { useAppSelector, useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { AboutDeal } from './AboutDeal';
import { history } from './CardDetail.helper';
import { History } from './History';
import { Progress } from './Progress';
import styles from './style.module.scss';
interface IProps {
  cardTitle?: string;
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

export const CardDetail: FC<IProps> = ({ cardTitle = '' }) => {
  const notify = useNotify();
  const { isNewDeal } = useAppSelector(sidebarSelectors.sidebar);
  const [isActiveTab, setIsActiveTab] = useState<string>(tabItems[0].type);
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(cardTitle);

  const getComponent = (type: string) => {
    const components = {
      [tabItems[0].type]: <AboutDeal />,
      [tabItems[1].type]: <History history={history} />,
      [tabItems[2].type]: <p>WhatsApp</p>
    };
    return components[type];
  };

  const onSaveTitleEdit = () => {
    setIsTitleEdit(false);
  };

  const onLinkCopy = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => notify(MESSAGE.LINK_COPIED))
      .catch(() => notify(MESSAGE.ERROR, 'error'));
  };

  return (
    <div className={cn(styles.cardDetail, { [styles.isNewDeal]: isNewDeal })}>
      <div className={styles.head}>
        <div className={styles.head_left}>
          {isTitleEdit ? (
            <Input
              className={styles.editInp}
              defaultValue={editedTitle}
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
      <Progress currentStage='received' />
      <div className={styles.content}>{getComponent(isActiveTab)}</div>
    </div>
  );
};
