import { FC } from 'react';
import styles from './styles.module.scss';

const progress = [
  {
    title: 'Поступили',
    type: 'received',
    color: '#BBED21'
  },
  {
    title: 'Взят в обработку',
    type: 'processed',
    color: '#13EDFB'
  },
  {
    title: 'Рассмотрение',
    type: 'consideration',
    color: '#068D34'
  },
  {
    title: 'Бронирование',
    type: 'booking',
    color: '#C214DE'
  },
  {
    title: 'Завершить сделку',
    type: 'finish',
    color: '#F21212'
  }
];

type IStage = 'received' | 'processed' | 'consideration' | 'booking' | 'finish';

interface IProps {
  currentStage: IStage;
}

export const Progress: FC<IProps> = ({ currentStage = progress[0].type }) => {
  const currentIndex = progress.findIndex((item) => item.type === currentStage);

  return (
    <div className={styles.progress}>
      {progress.map((item, index) => (
        <div
          key={index}
          className={styles.progress_item}
          style={{
            borderBottomColor: index <= currentIndex ? progress[currentIndex].color : item.color,
            backgroundColor: index <= currentIndex ? progress[currentIndex].color : ''
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
