import { Button, Input, Loading } from 'common/ui';
import { DocumentTable } from './DocumentTable/DocumentTable';
// import { Navbar } from 'common/components';
// import { documentChapters } from 'common/constants';
// import { NAVBAR_PAGES } from 'types/enums';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const data = [
  {
    title: 'Пример документа 1',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 3',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  },
  {
    title: 'Пример документа 2',
    file: 'file PDF'
  }
];

export const Document = () => {
  return (
    <Loading>
      <div className={styles.document}>
        {/* <Navbar navbarItems={documentChapters} page={NAVBAR_PAGES.DOCUMENT} /> */}
        {/* <Loading /> */}
        <div className={styles.headBlock}>
          <div className={styles.titleBlock}>
            <h1>Документы</h1>
            <Button text='загрузить документ' styleType={BUTTON_TYPES.YELLOW} />
          </div>
          <Input placeholder='Поиск' isSearch />
        </div>
        <div className={styles.tableWrapper}>
          <DocumentTable data={data} />
        </div>
      </div>
    </Loading>
  );
};
