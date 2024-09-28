import { useRef, useState } from 'react';
import { Icon } from 'common/ui';
import styles from './Settings.module.scss';

const initialValues = {
  Conversion: 100,
  Bonuses: 100,
  Profit: 100,
  PAX: 100,
  AdditionalBonuses: 40,
  CrmManagement: 20
};

// Определяем тип ключей объекта initialValues
type SettingsType = keyof typeof initialValues;

interface SettingsDataProps {
  type: SettingsType; // указываем тип параметра type
}

export const SettingsData = ({ type }: SettingsDataProps) => {
  const [value, setValue] = useState(initialValues[type]);
  const [isEditing, setIsEditing] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [originalValue, setOriginalValue] = useState(value);

  const handleBlur = () => {
    if (isEditing) {
      saveChanges();
    }
  };

  const handleClickSwitchBtn = () => {
    setSwitchState((prev) => !prev);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setValue(originalValue);
    setIsEditing(false);
  };

  const startEdit = () => {
    setOriginalValue(value);
    setIsEditing(true);
    inputRef.current?.focus(); // Устанавливаем фокус на поле ввода
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className={styles.bonusesInner}>
      <div className={styles.bonusesPercent}>
        <input
          ref={inputRef}
          className={styles.bonusesInput}
          type='text'
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={!isEditing}
        />
        <span>%</span>
      </div>
      {isEditing ? (
        <div className={styles.bonusesEditWrapper}>
          <button className={`${styles.btn} ${styles.saveBtn}`} onClick={saveChanges}>
            <Icon className={styles.saveSvg} type='done' />
          </button>
          <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={cancelChanges}>
            <Icon className={styles.cancelSvg} type='burger-close' />
          </button>
        </div>
      ) : (
        <Icon className={styles.bonusesEdit} type='edit' onClick={startEdit} />
      )}
      <button className={`${styles.switchWrapper} ${switchState ? styles.switchTrue : styles.switchFalse}`} onClick={handleClickSwitchBtn}>
        <span className={`${styles.switch} ${switchState ? styles.switchTrue : styles.switchFalse}`}></span>
      </button>
    </div>
  );
};
