import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from 'common/ui';
import { BirthDayModal } from 'common/components';
import { Birthday } from 'types/entities';
import styles from './styles.module.scss';

export const BirthdaysToday: FC = () => {
  const location = useLocation();
  const birthdays = (location.state as Birthday[]) || [];
  const [currentBirthday, setCurrentBirthday] = useState<Birthday | null>(null);
  const [birthdayOpen, setBirthdayOpen] = useState<boolean>(false);

  const onBirthdayClick = (data: Birthday) => {
    setCurrentBirthday(data);
    setBirthdayOpen(true);
  };

  const onCloseBirthdayModal = () => {
    setCurrentBirthday(null);
    setBirthdayOpen(false);
  };

  return (
    <div className={styles.birthdayList}>
      <p className={styles.title}>Дни рождения сегодня</p>
      <div className={styles.columns}>
        {birthdays.map((birthday) => (
          <div key={birthday.name} className={styles.birthday} onClick={() => onBirthdayClick(birthday)}>
            <Icon type='birthday' /> {birthday.name}
          </div>
        ))}
      </div>
      {currentBirthday && <BirthDayModal isOpen={birthdayOpen} data={currentBirthday} onCancel={onCloseBirthdayModal} />}
    </div>
  );
};
