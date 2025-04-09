import { useEffect, useRef, useState } from 'react';
import { Icon, Loading } from 'common/ui';
import { SettingsData } from 'common/components/SettingsData/SettingsData';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import {
  useCreateSettingsCalculatorBrandMutation,
  useCreateSettingsCalculatorProductMutation,
  useDeleteSettingsCalculatorBrandMutation,
  useDeleteSettingsCalculatorProductMutation,
  useGetAppSettingsQuery,
  useGetSettingsCalculatorBrandQuery,
  useGetSettingsCalculatorProductQuery,
  useUpdateSettingsCalculatorBrandMutation,
  useUpdateSettingsCalculatorProductMutation
} from 'api/admin/appSettings/appSettings.api';
import { ISettingsCalculatorBrandData } from 'types/entities';
import styles from './styles.module.scss';

export const Settings = () => {
  const notify = useNotify();
  const { data: settingsData } = useGetAppSettingsQuery();
  const { data: brandFetchData } = useGetSettingsCalculatorBrandQuery();
  const [createSettingsCalculatorBrand] = useCreateSettingsCalculatorBrandMutation();
  const [updateSettingsCalculatorBrand] = useUpdateSettingsCalculatorBrandMutation();
  const [deleteSettingsCalculatorBrand] = useDeleteSettingsCalculatorBrandMutation();
  const { data: serviceFetchData } = useGetSettingsCalculatorProductQuery();
  const [updateSettingsCalculatorProduct] = useUpdateSettingsCalculatorProductMutation();
  const [createSettingsCalculatorProduct] = useCreateSettingsCalculatorProductMutation();
  const [deleteSettingsCalculatorProduct] = useDeleteSettingsCalculatorProductMutation();
  const [brandData, setBrandData] = useState<ISettingsCalculatorBrandData[]>(brandFetchData || []);
  const [serviceData, setServiceData] = useState<ISettingsCalculatorBrandData[]>(serviceFetchData || []);

  const brandInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const serviceInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    if (brandFetchData) {
      setBrandData(brandFetchData);
    }
  }, [brandFetchData]);

  useEffect(() => {
    if (serviceFetchData) {
      setServiceData(serviceFetchData);
    }
  }, [serviceFetchData]);

  const handleBrandEdit = (id: string) => {
    setBrandData((prevData) =>
      prevData.map((item) => ({
        ...item,
        isEditing: item.id === id ? !item.isEditing : false
      }))
    );
  };

  const handleBrandSave = (id: string) => {
    const newItemValue = brandData.find((el) => el.id === id)?.name;
    if (id === 'newElement') {
      createSettingsCalculatorBrand(newItemValue ?? '')
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    } else {
      updateSettingsCalculatorBrand({ id, name: newItemValue ?? '' })
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  const handleBrandDelete = (id: string) => {
    deleteSettingsCalculatorBrand(id)
      .unwrap()
      .then(() => {
        notify(MESSAGE.DELETED, 'success');
      });
  };

  const handleBrandCancel = (id: string) => {
    setBrandData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleBrandChange = (id: string, newValue: string) => {
    setBrandData((prevData) => prevData.map((item) => (item.id === id ? { ...item, name: newValue } : item)));
  };

  const addNewBrandField = () => {
    const newId = 'newElement';
    setBrandData((prevData) => [...prevData, { id: newId, name: '', isEditing: true }]);
  };

  const handleServiceEdit = (id: string) => {
    setServiceData((prevData) =>
      prevData.map((item) => ({
        ...item,
        isEditing: item.id === id ? !item.isEditing : false
      }))
    );
  };

  const handleServiceSave = (id: string) => {
    const newItemValue = serviceData.find((el) => el.id === id)?.name;
    if (id === 'newElement') {
      createSettingsCalculatorProduct(newItemValue || '')
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    } else {
      updateSettingsCalculatorProduct({ id, name: newItemValue ?? '' })
        .unwrap()
        .then(() => {
          notify(MESSAGE.SUCCESS, 'success');
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  const handleServiceDelete = (id: string) => {
    deleteSettingsCalculatorProduct(id)
      .unwrap()
      .then(() => {
        notify(MESSAGE.DELETED, 'success');
      });
  };

  const handleServiceCancel = (id: string) => {
    setServiceData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));
  };

  const handleServiceChange = (id: string, newValue: string) => {
    setServiceData((prevData) => prevData.map((item) => (item.id === id ? { ...item, name: newValue } : item)));
  };

  const addNewServiceField = () => {
    const newId = 'newElement';
    setServiceData((prevData) => [...prevData, { id: newId, name: '', isEditing: true }]);
  };

  useEffect(() => {
    brandData.forEach((item) => {
      if (item.isEditing && brandInputRefs.current[item.id]) {
        brandInputRefs.current[item.id]?.focus();
      }
    });

    serviceData.forEach((item) => {
      if (item.isEditing && serviceInputRefs.current[item.id]) {
        serviceInputRefs.current[item.id]?.focus();
      }
    });
  }, [brandData, serviceData]);

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
                        value={item.name}
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
                        value={item.name}
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
                <SettingsData
                  percentName={'conversionPercentage'}
                  percentValue={settingsData?.conversionPercentage}
                  countName={'conversionCount'}
                  countValue={settingsData?.conversionCount}
                  toggleName={'conversionEnabled'}
                  toggleValue={settingsData?.conversionEnabled}
                />
              </li>

              <li className={`${styles.startBlock} ${styles.bonuses}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.bonusesTitle}`}>Бонусы</h4>
                  <p className={`${styles.startInnerText} ${styles.bonusesText}`}>Вы можете менять проценты бонусов сотрудника</p>
                </div>
                <SettingsData
                  percentName={'bonusPercentage'}
                  percentValue={settingsData?.bonusPercentage}
                  toggleName={'bonusEnabled'}
                  toggleValue={settingsData?.bonusEnabled}
                />
              </li>

              <li className={`${styles.startBlock} ${styles.profit}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.profitTitle}`}>Прибыль</h4>
                  <p className={`${styles.startInnerText} ${styles.profitText}`}>Вы можете включать и отключать показатели прибыли</p>
                </div>
                <SettingsData
                  percentName={'profitPercentage'}
                  percentValue={settingsData?.profitPercentage}
                  countName={'profitCount'}
                  countValue={settingsData?.profitCount}
                  toggleName={'profitEnabled'}
                  toggleValue={settingsData?.profitEnabled}
                />
              </li>

              <li className={`${styles.startBlock} ${styles.pax}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.paxTitle}`}>PAX</h4>
                  <p className={`${styles.startInnerText} ${styles.paxText}`}>Вы можете включать и отключать показатели PAX</p>
                </div>
                <SettingsData
                  percentName={'paxPercentage'}
                  percentValue={settingsData?.paxPercentage}
                  countName={'paxCount'}
                  countValue={settingsData?.paxCount}
                  toggleName={'paxEnabled'}
                  toggleValue={settingsData?.paxEnabled}
                />
              </li>

              <li className={`${styles.startBlock} ${styles.additionalBonuses}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.additionalBonusesTitle}`}>Дополнительные бонусы</h4>
                  <p className={`${styles.startInnerText} ${styles.additionalBonusesText}`}>Измените дополнительные бонусы</p>
                </div>
                <SettingsData
                  percentName={'additionalBonusPercentage'}
                  percentValue={settingsData?.additionalBonusPercentage}
                  toggleName={'additionalBonusEnabled'}
                  toggleValue={settingsData?.additionalBonusEnabled}
                />
              </li>

              <li className={`${styles.startBlock} ${styles.crmManagement}`}>
                <div>
                  <h4 className={`${styles.startInnerTitle} ${styles.crmManagementTitle}`}>Ведение CRM</h4>
                  <p className={`${styles.startInnerText} ${styles.crmManagementText}`}>Управляйте CRM-процессами</p>
                </div>
                <SettingsData
                  percentName={'crmManagementPercentage'}
                  percentValue={settingsData?.crmManagementPercentage}
                  toggleName={'crmManagementEnabled'}
                  toggleValue={settingsData?.crmManagementEnabled}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Loading>
  );
};
