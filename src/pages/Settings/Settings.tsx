import { useEffect, useRef, useState } from 'react';
import { Icon, Loading } from 'common/ui';
import styles from './styles.module.scss';

type MockDataType = {
  id: number;
  value: string;
  isEditing: boolean;
};

const mockData = {
  conversionPercent: 100 // например, 25%
};

export const Settings = () => {
  const [conversionSwitchBtn, setConversionSwitchBtn] = useState(false);
  const [profitSwitchBtn, setProfitSwitchBtn] = useState(false);
  const [paxSwitchBtn, setPaxSwitchBtn] = useState(false);
  const [conversionPercent, setConversionPercent] = useState(mockData.conversionPercent);
  const [conversionIsEditing, setConversionIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [originalConversionPercent, setOriginalConversionPercent] = useState(mockData.conversionPercent);

  const [bonusesPercent, setBonusesPercent] = useState(mockData.conversionPercent);
  const [bonusesIsEditing, setBonusesIsEditing] = useState(false);
  const bonusesInputRef = useRef<HTMLInputElement>(null);
  const [originalBonusesPercent, setOriginalBonusesPercent] = useState(mockData.conversionPercent);
  // Состояние для блока "Бренды"
  const [brandData, setBrandData] = useState<MockDataType[]>([
    { id: 1, value: 'Бренд 1', isEditing: false },
    { id: 2, value: 'Бренд 2', isEditing: false },
    { id: 3, value: 'Бренд 3', isEditing: false }
  ]);

  // Состояние для блока "Услуги"
  const [serviceData, setServiceData] = useState<MockDataType[]>([
    { id: 1, value: 'Услуга 1', isEditing: false },
    { id: 2, value: 'Услуга 2', isEditing: false },
    { id: 3, value: 'Услуга 3', isEditing: false }
  ]);

  const brandInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const serviceInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  // Обработчики для блока "Бренды"
  const handleBrandEdit = (id: number) => {
    setBrandData((prevData) =>
      prevData.map((item) => ({
        ...item,
        isEditing: item.id === id ? !item.isEditing : false
      }))
    );
  };

  const handleBrandSave = (id: number) => {
    setBrandData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleBrandDelete = (id: number) => {
    setBrandData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleBrandCancel = (id: number) => {
    setBrandData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleBrandChange = (id: number, newValue: string) => {
    setBrandData((prevData) => prevData.map((item) => (item.id === id ? { ...item, value: newValue } : item)));
  };

  const addNewBrandField = () => {
    const newId = Math.max(...brandData.map((item) => item.id), 0) + 1;
    setBrandData((prevData) => [...prevData, { id: newId, value: '', isEditing: true }]);
  };

  // Обработчики для блока "Услуги"
  const handleServiceEdit = (id: number) => {
    setServiceData((prevData) =>
      prevData.map((item) => ({
        ...item,
        isEditing: item.id === id ? !item.isEditing : false
      }))
    );
  };

  const handleServiceSave = (id: number) => {
    setServiceData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleServiceDelete = (id: number) => {
    setServiceData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleServiceCancel = (id: number) => {
    setServiceData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleServiceChange = (id: number, newValue: string) => {
    setServiceData((prevData) => prevData.map((item) => (item.id === id ? { ...item, value: newValue } : item)));
  };

  const addNewServiceField = () => {
    const newId = Math.max(...serviceData.map((item) => item.id), 0) + 1;
    setServiceData((prevData) => [...prevData, { id: newId, value: '', isEditing: true }]);
  };

  useEffect(() => {
    // Фокус на поле ввода, если оно находится в режиме редактирования для брендов
    brandData.forEach((item) => {
      if (item.isEditing && brandInputRefs.current[item.id]) {
        brandInputRefs.current[item.id]?.focus();
      }
    });

    // Фокус на поле ввода, если оно находится в режиме редактирования для услуг
    serviceData.forEach((item) => {
      if (item.isEditing && serviceInputRefs.current[item.id]) {
        serviceInputRefs.current[item.id]?.focus();
      }
    });
  }, [brandData, serviceData]);

  const handleClickConversionSwitchBtn = () => {
    setConversionSwitchBtn((prev) => !prev);
    console.log(conversionSwitchBtn);
  };
  const handleClickProfitSwitchBtn = () => {
    setProfitSwitchBtn((prev) => !prev);
    console.log(profitSwitchBtn);
  };
  const handleClickPaxSwitchBtn = () => {
    setPaxSwitchBtn((prev) => !prev);
    console.log(paxSwitchBtn);
  };
  const startConversionEdit = () => {
    setOriginalConversionPercent(conversionPercent);
    setConversionIsEditing(true);
    inputRef.current?.focus(); // Устанавливаем фокус на поле ввода
  };

  const saveConversionChanges = () => {
    // Логика для сохранения изменений
    setConversionIsEditing(false);
  };
  const cancelConversionChanges = () => {
    setConversionPercent(originalConversionPercent);
    setConversionIsEditing(false);
  };

  const handleConversionBlur = () => {
    if (conversionIsEditing) {
      saveConversionChanges();
    }
  };

  const startBonusesEdit = () => {
    setOriginalBonusesPercent(bonusesPercent);
    setBonusesIsEditing(true);
    bonusesInputRef.current?.focus(); // Устанавливаем фокус на поле ввода
  };

  const saveBonusesChanges = () => {
    // Логика для сохранения изменений
    setBonusesIsEditing(false);
  };

  const cancelBonusesChanges = () => {
    setBonusesPercent(originalBonusesPercent);
    setBonusesIsEditing(false);
  };

  const handleBonusesBlur = () => {
    if (bonusesIsEditing) {
      saveBonusesChanges();
    }
  };

  return (
    <Loading>
      <div className={styles.settings}>
        <h1>Настройки</h1>
        <div className={styles.settingsContainer}>
          <div className={styles.calculator}>
            <h2 className={styles.blocksTitle}>Калькулятор</h2>
            <div className={styles.calculatorInner}>
              <div className={`${styles.calculatorBlock} ${styles.brand}`}>
                <div className={styles.blockTextWrapper}>
                  <h2 className={styles.blockTitle}>Бренд</h2>
                  <p className={styles.blockText}>Вы можете добавлять новые поля, редактировать содержимое и удалять поля</p>
                </div>
                <ul className={styles.dataWrapper}>
                  {brandData.map((item) => (
                    <li key={item.id} className={styles.dataItem}>
                      <input
                        className={styles.input}
                        type='text'
                        value={item.value}
                        ref={(el) => (brandInputRefs.current[item.id] = el)}
                        onChange={(e) => handleBrandChange(item.id, e.target.value)}
                        readOnly={!item.isEditing}
                      />
                      {item.isEditing ? (
                        <>
                          <button className={`${styles.btn} ${styles.saveBtn}`} onClick={() => handleBrandSave(item.id)}>
                            <Icon className={styles.saveSvg} type='done' />
                          </button>
                          <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={() => handleBrandCancel(item.id)}>
                            <Icon className={styles.cancelSvg} type='burger-close' />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => handleBrandEdit(item.id)}>
                            <Icon className={styles.icon} type='edit' />
                          </button>
                          <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => handleBrandDelete(item.id)}>
                            <Icon className={styles.icon} type='delete' />
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                  <li className={styles.plussWrapper}>
                    <button className={`${styles.btn} ${styles.addBtn}`} onClick={addNewBrandField}>
                      <Icon className={styles.icon} type='plus-icon' />
                    </button>
                  </li>
                </ul>
              </div>

              <div className={`${styles.calculatorBlock} ${styles.services}`}>
                <div className={styles.blockTextWrapper}>
                  <h2 className={styles.blockTitle}>Услуги</h2>
                  <p className={styles.blockText}>Вы можете добавлять новые поля, редактировать содержимое и удалять поля</p>
                </div>
                <ul className={styles.dataWrapper}>
                  {serviceData.map((item) => (
                    <li key={item.id} className={styles.dataItem}>
                      <input
                        className={styles.input}
                        type='text'
                        value={item.value}
                        ref={(el) => (serviceInputRefs.current[item.id] = el)}
                        onChange={(e) => handleServiceChange(item.id, e.target.value)}
                        readOnly={!item.isEditing}
                      />
                      {item.isEditing ? (
                        <>
                          <button className={`${styles.btn} ${styles.saveBtn}`} onClick={() => handleServiceSave(item.id)}>
                            <Icon className={styles.saveSvg} type='done' />
                          </button>
                          <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={() => handleServiceCancel(item.id)}>
                            <Icon className={styles.cancelSvg} type='burger-close' />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => handleServiceEdit(item.id)}>
                            <Icon className={styles.icon} type='edit' />
                          </button>
                          <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => handleServiceDelete(item.id)}>
                            <Icon className={styles.icon} type='delete' />
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                  <li className={styles.plussWrapper}>
                    <button className={`${styles.btn} ${styles.addBtn}`} onClick={addNewServiceField}>
                      <Icon className={styles.icon} type='plus-icon' />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.startWrapper}>
            <h2 className={styles.blocksTitle}>Старт</h2>
            <ul className={styles.startInner}>
              <li className={`${styles.startBlock} ${styles.conversion}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.conversionTitle}`}>Конверсия</h4>
                  <p className={`${styles.startInnerText} ${styles.conversionText}`}>Вы можете менять процент в конверсии KPI</p>
                </div>
                <div className={styles.conversionInner}>
                  <div className={styles.conversionPercent}>
                    <input
                      ref={inputRef}
                      className={styles.conversionInput}
                      type='text'
                      value={conversionPercent}
                      onChange={(e) => setConversionPercent(Number(e.target.value))}
                      onBlur={handleConversionBlur}
                      readOnly={!conversionIsEditing}
                    />
                    <span>%</span>
                  </div>
                  {conversionIsEditing ? (
                    <div className={styles.conversionEditWrapper}>
                      <button className={`${styles.btn} ${styles.saveBtn}`} onClick={saveConversionChanges}>
                        <Icon className={styles.saveSvg} type='done' />
                      </button>
                      <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={cancelConversionChanges}>
                        <Icon className={styles.cancelSvg} type='burger-close' />
                      </button>
                    </div>
                  ) : (
                    <Icon className={styles.conversionEdit} type='edit' onClick={startConversionEdit} />
                  )}
                  <button
                    className={`${styles.switchWrapper} ${conversionSwitchBtn ? styles.switchTrue : styles.switchFalse}`}
                    onClick={handleClickConversionSwitchBtn}
                  >
                    <span className={`${styles.switch} ${conversionSwitchBtn ? styles.switchTrue : styles.switchFalse}`}></span>
                  </button>
                </div>
              </li>

              <li className={`${styles.startBlock} ${styles.bonuses}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.bonusesTitle}`}>Бонусы</h4>
                  <p className={`${styles.startInnerText} ${styles.bonusesText}`}>Вы можете менять проценты бонусов сотрудника</p>
                </div>
                <div className={styles.bonusesInner}>
                  <div className={styles.bonusesPercent}>
                    <input
                      ref={bonusesInputRef}
                      className={styles.bonusesInput}
                      type='text'
                      value={bonusesPercent}
                      onChange={(e) => setBonusesPercent(Number(e.target.value))}
                      onBlur={handleBonusesBlur}
                      readOnly={!bonusesIsEditing}
                    />
                    <span>%</span>
                  </div>
                  {bonusesIsEditing ? (
                    <div className={styles.bonusesEditWrapper}>
                      <button className={`${styles.btn} ${styles.saveBtn}`} onClick={saveBonusesChanges}>
                        <Icon className={styles.saveSvg} type='done' />
                      </button>
                      <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={cancelBonusesChanges}>
                        <Icon className={styles.cancelSvg} type='burger-close' />
                      </button>
                    </div>
                  ) : (
                    <Icon className={styles.bonusesEdit} type='edit' onClick={startBonusesEdit} />
                  )}
                </div>
              </li>

              <li className={`${styles.startBlock} ${styles.profit}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.profitTitle}`}>Прибыль</h4>
                  <p className={`${styles.startInnerText} ${styles.profitText}`}>Вы можете выключить - включить Прибыль, чтобы что-то...</p>
                </div>
                <button
                  className={`${styles.switchWrapper} ${profitSwitchBtn ? styles.switchTrue : styles.switchFalse}`}
                  onClick={handleClickProfitSwitchBtn}
                >
                  <span className={`${styles.switch} ${profitSwitchBtn ? styles.switchTrue : styles.switchFalse}`}></span>
                </button>
              </li>

              <li className={`${styles.startBlock} ${styles.pax}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.paxTitle}`}>PAX</h4>
                  <p className={`${styles.startInnerText} ${styles.paxText}`}>Вы можете выключить - включить PAX, чтобы что-то...</p>
                </div>
                <button
                  className={`${styles.switchWrapper} ${paxSwitchBtn ? styles.switchTrue : styles.switchFalse}`}
                  onClick={handleClickPaxSwitchBtn}
                >
                  <span className={`${styles.switch} ${paxSwitchBtn ? styles.switchTrue : styles.switchFalse}`}></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Loading>
  );
};
