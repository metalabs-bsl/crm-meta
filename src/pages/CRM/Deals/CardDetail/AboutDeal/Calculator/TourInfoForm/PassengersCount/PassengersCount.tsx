import { FC } from 'react';
import { Icon } from 'common/ui';
import { PassengerCounts, passengerTypes } from '../TourInfoForm.helper';
import styles from './style.module.scss';

interface IProps {
  passengerCounts: PassengerCounts;
  setPassengerCounts: (update: (prevCounts: PassengerCounts) => PassengerCounts) => void;
}

export const PassengersCount: FC<IProps> = ({ passengerCounts, setPassengerCounts }) => {
  const incrementCount = (key: 'adults' | 'children' | 'children_old') => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [key]: prevCounts[key] + 1
    }));
  };

  const decrementCount = (key: 'adults' | 'children' | 'children_old') => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [key]: prevCounts[key] > 0 ? prevCounts[key] - 1 : 0
    }));
  };

  return (
    <div className={styles.container}>
      {passengerTypes.map(({ type, text, stateKey }) => (
        <div className={styles.blocks} key={stateKey}>
          <div className={styles.title_block}>
            <span className={styles.type}>{type}</span>
            <span className={styles.text}>{text}</span>
          </div>
          <div className={styles.count_block}>
            <Icon type={`count-minus-${passengerCounts[stateKey] === 0 ? 'un' : ''}active`} onClick={() => decrementCount(stateKey)} />
            <div className={styles.count}>{passengerCounts[stateKey]}</div>
            <Icon type='count-plus-active' onClick={() => incrementCount(stateKey)} />
          </div>
        </div>
      ))}
    </div>
  );
};
