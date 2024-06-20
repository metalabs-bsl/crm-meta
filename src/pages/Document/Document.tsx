import { Button, Loading, SearchInput } from 'common/ui';
import { Empty } from 'common/ui/Empty';
import { DocumentTable } from './DocumentTable/DocumentTable';
// import { Navbar } from 'common/components';
// import { documentChapters } from 'common/constants';
// import { NAVBAR_PAGES } from 'types/enums';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export interface DocumentData {
  title: string;
  file: string;
}

const data: DocumentData[] = [
  // {
  //   title: 'Пример документа 1',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 3',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // },
  // {
  //   title: 'Пример документа 2',
  //   file: 'file PDF'
  // }
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
          <SearchInput placeholder='Поиск' />
        </div>
        <div className={styles.tableWrapper}>{data.length ? <DocumentTable data={data} /> : <Empty />}</div>
      </div>
    </Loading>
  );
};
