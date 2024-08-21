import { useEffect, useState } from 'react';
import { Button, FilePicker, Loading, SearchInput } from 'common/ui';
import { Modal, Tabs } from 'common/components';
import { DocumentTable } from './DocumentTable/DocumentTable';
import { OriginalTable } from './OriginalTable';
import styles from './styles.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

export interface DocumentData {
  id: string;
  name: string;
  title: string;
  file: string;
}

const data: DocumentData[] = [
  {
    id: '12345',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '123456780',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '12',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '1231123',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '75856',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '3456',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '89070',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '578567856',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '334523',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '4567456',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '45674547',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '567856875678',
    name: 'Азатов Азат Азатович',
    title: 'Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '3213412',
    name: 'Азатов Азат Азатович',
    title: 'Предпоследний Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  },
  {
    id: '120934',
    name: 'Азатов Азат Азатович',
    title: 'Последний Договор на случай если пришельцы решат напасть',
    file: 'PDF'
  }
];

const originalData = [
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Предпоследний Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  },
  {
    title: 'Последний Договор на случай если пришельцы решат напасть и уничтожить нашу планету и захватить его',
    format: 'format'
  }
];

const tabItems = [
  { type: 'tab1', title: 'Составленные' },
  { type: 'tab2', title: 'Оригинальные' }
];

interface FormValues {
  documentNumber: string;
  file: File;
}

export const Document = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File>(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [inputWrapper, setInputWrapper] = useState(false);

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
    setInputWrapper(activeTab === 'tab1');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = () => {
    //обновляем форму после отправки
    reset();
    handleModalClose();
  };

  useEffect(() => {
    isModalOpen && register('documentNumber', { required: false });
  }, [isModalOpen, register]);

  return (
    <Loading>
      <div className={styles.document}>
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Документы</h1>
            <Button text='загрузить документ' styleType={BUTTON_TYPES.YELLOW} onClick={handleModalOpen} />
          </div>
          <SearchInput placeholder='Поиск' />
        </div>
        <Tabs
          tabItems={tabItems}
          isActiveTab={activeTab}
          setIsActiveTab={setActiveTab}
          className={styles.customTabsBlock}
          tabClassName={styles.customTab}
          activeTabClassName={styles.customActiveTab}
        />
        <div className={styles.tableWrapper}>
          {activeTab === 'tab1' && <DocumentTable data={data} />}
          {activeTab === 'tab2' && <OriginalTable originalData={originalData} />}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className={styles.modalInner}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.filePickerWrapper}>
                <FilePicker
                  onChange={(file) => {
                    if (file) {
                      setFile(file); // Обновляем состояние с массивом файлов
                    }
                  }}
                />
              </div>
              {inputWrapper && (
                <div className={styles.inputWrapper} style={{ display: 'flex' }}>
                  <label htmlFor='documentNumber'>Номер договора:</label>
                  <input id='documentNumber' {...register('documentNumber', { required: 'Это поле обязательно' })} />
                  {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
                </div>
              )}
              <div className={styles.readyBtnWrapper}>
                <Button className={styles.readyBtn} styleType={BUTTON_TYPES.GREEN} text='Готово' type='submit' />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Loading>
  );
};
