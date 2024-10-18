import { useEffect, useRef, useState } from 'react';
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

type SettingsType = keyof typeof initialValues;

interface SettingsDataProps {
  type: SettingsType;
  isProcent?: boolean;
  secondInput: boolean;
  onSave: (data: { value: number; secondValue?: number }) => void; // Добавляем callback для передачи значений
}

export const SettingsData = ({ type, isProcent, secondInput, onSave }: SettingsDataProps) => {
  const [value, setValue] = useState(initialValues[type]);
  const [secondValue, setSecondValue] = useState<number | undefined>(undefined); // Для второго инпута
  const [isEditing, setIsEditing] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [originalValue, setOriginalValue] = useState(value);

  // Добавляем useEffect для сохранения значений при изменении
  useEffect(() => {
    onSave({ value, secondValue }); // Передаем оба значения, если secondInput существует
  }, [value, secondValue]);

  const handleClickSwitchBtn = () => {
    setSwitchState((prev) => !prev);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setValue(originalValue);
    setSecondValue(undefined); // Сбрасываем значение второго инпута, если оно есть
    setIsEditing(false);
  };

  const startEdit = () => {
    setOriginalValue(value);
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setSecondValue(newValue);
    }
  };

  return (
    <div className={styles.bonusesInner}>
      {secondInput && (
        <div className={styles.bonusesPercent}>
          <input
            ref={inputRef}
            className={styles.bonusesInput}
            type='text'
            value={secondValue ?? ''}
            onChange={handleSecondInputChange}
            readOnly={!isEditing}
          />
          {isProcent ? <span>%</span> : <></>}
        </div>
      )}
      <div className={styles.bonusesPercent}>
        <input ref={inputRef} className={styles.bonusesInput} type='text' value={value} onChange={handleChange} readOnly={!isEditing} />
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
