import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useUpdateAppSettingsMutation } from 'api/admin/appSettings/appSettings.api';
import styles from './Settings.module.scss';

interface SettingsDataProps {
  percentName: string;
  percentValue?: number;
  countName?: string;
  countValue?: number;
  toggleName: string;
  toggleValue?: boolean;
}

export const SettingsData: FC<SettingsDataProps> = ({ percentName, percentValue, countName, countValue, toggleName, toggleValue }) => {
  const notify = useNotify();
  const [updateAppSettings] = useUpdateAppSettingsMutation();
  const [value, setValue] = useState(percentValue ?? 0);
  const [secondValue, setSecondValue] = useState<number>(countValue ?? 0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [switchState, setSwitchState] = useState<boolean>(toggleValue ?? false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (percentValue !== undefined) {
      setValue(percentValue);
    }
  }, [percentValue]);

  useEffect(() => {
    if (countValue !== undefined) {
      setSecondValue(countValue);
    }
  }, [countValue]);

  useEffect(() => {
    if (toggleValue !== undefined) {
      setSwitchState(toggleValue);
    }
  }, [toggleValue]);

  const handleClickSwitchBtn = () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);

    const dataToSave = {
      [toggleName]: newSwitchState
    };

    updateAppSettings(dataToSave)
      .unwrap()
      .then(() => {
        notify(MESSAGE.UPDATED, 'success');
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };

  const saveChanges = () => {
    setIsEditing(false);

    const dataToSave = {
      [percentName]: value
    };

    if (countName) {
      dataToSave[countName] = secondValue;
    }

    updateAppSettings(dataToSave)
      .unwrap()
      .then(() => {
        notify(MESSAGE.UPDATED, 'success');
      })
      .catch(() => {
        notify(MESSAGE.ERROR, 'error');
      });
  };

  const cancelChanges = () => {
    setIsEditing(false);
  };

  const startEdit = () => {
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
      {countValue !== undefined && (
        <div className={styles.bonusesPercent}>
          <input className={styles.bonusesInput} type='text' value={secondValue} onChange={handleSecondInputChange} readOnly={!isEditing} />
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
