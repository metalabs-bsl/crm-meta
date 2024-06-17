import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { LossForm, Modal } from 'common/components';
import { useNotify } from 'common/hooks';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

enum FINISH_TYPE {
  NOT_CHOSEN = 'not-chosen',
  SALE = 'sale',
  LOSS = 'loss'
}

type IStage = 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
interface IProgress {
  title: string;
  color: string;
  type: IStage;
}

const progress: IProgress[] = [
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

interface IProps {
  currentStage: IStage;
}

export const Progress: FC<IProps> = ({ currentStage = progress[0].type }) => {
  const notify = useNotify();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [brightnesItems, setBrightnesItems] = useState<number>(-1);
  const [isProgressFinishOpen, setIsProgressFinishOpen] = useState<boolean>(false);
  const [isLossOpen, setIsLossOpen] = useState<boolean>(false);
  const [, setFinishType] = useState<FINISH_TYPE>(FINISH_TYPE.NOT_CHOSEN);
  const [lossType, setLossType] = useState<string>('');

  useEffect(() => {
    if (currentStage) {
      const current = progress.findIndex((item) => item.type === currentStage);
      setCurrentIndex(current);
      setActiveStage(current);
    }
  }, [currentStage]);

  const changeStage = (index: number, item: IProgress) => {
    setCurrentIndex(index);
    setActiveStage(index);
    setBrightnesItems(index);
    notify(`Выбран статус -  "${item.title}"`);
    setTimeout(() => {
      setBrightnesItems(-1);
    }, 500);
    if (item.type === 'finish') {
      setIsProgressFinishOpen(true);
    }
  };

  const onCloseFinishModal = () => {
    setIsProgressFinishOpen(false);
  };

  const onSale = () => {
    setFinishType(FINISH_TYPE.SALE);
    onCloseFinishModal();
  };

  const onLoss = () => {
    setFinishType(FINISH_TYPE.LOSS);
    onCloseFinishModal();
    setIsLossOpen(true);
  };

  const onCloseLossModal = () => {
    setIsLossOpen(false);
  };

  const onLossCancel = () => {
    onCloseLossModal();
    setIsProgressFinishOpen(true);
  };

  const onLossSave = () => {
    console.log('lossType', lossType);
    onCloseLossModal();
  };

  return (
    <div className={styles.progress}>
      {progress.map((item, index) => (
        <div
          key={index}
          className={cn(styles.progress_item, { [styles.clicked_items]: index <= brightnesItems })}
          onClick={() => changeStage(index, item)}
          onMouseEnter={() => setCurrentIndex(index)}
          onMouseLeave={() => setCurrentIndex(activeStage)}
          style={{
            borderBottomColor: index <= currentIndex ? progress[currentIndex].color : item.color,
            backgroundColor: index <= currentIndex ? progress[currentIndex].color : ''
          }}
        >
          {item.title}
        </div>
      ))}
      <Modal
        isOpen={isProgressFinishOpen}
        onClose={onCloseFinishModal}
        leftBtnText='продажа'
        leftBtnStyle={BUTTON_TYPES.GREEN}
        leftBtnAction={onSale}
        rightBtnText='проигрыш'
        rightBtnStyle={BUTTON_TYPES.RED}
        rightBtnAction={onLoss}
      >
        <div className={styles.modalWrapper}>
          <p className={styles.modalWrapperText}>
            Выберите результат, <br /> с которым будет закрыта сделка.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={isLossOpen}
        onClose={onCloseLossModal}
        leftBtnText='сохранить'
        leftBtnStyle={BUTTON_TYPES.YELLOW}
        leftBtnAction={onLossSave}
        rightBtnText='отменить'
        rightBtnStyle={BUTTON_TYPES.Link_BLACK}
        rightBtnAction={onLossCancel}
      >
        <LossForm onChangeValueType={setLossType} />
      </Modal>
    </div>
  );
};
