import { Icon } from 'common/ui';
import { CreateForm } from './CreateContentForm';
import { Group } from './Group';
import { dataBlocks } from './Todo.helper';
import styles from './style.module.scss';

export const Todo = () => {
  return (
    <div className={styles.container}>
      <CreateForm />
      {dataBlocks.map((block) => {
        const { blockTitle, icon, data, cardsType } = block;
        return (
          <div className={styles.blocks} key={cardsType}>
            <div className={styles.blocks_title}>
              <Icon type={icon} />
              <span>{blockTitle}</span>
            </div>
            {data.map((group) => (
              <Group key={group.date} group={group} type={cardsType} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
