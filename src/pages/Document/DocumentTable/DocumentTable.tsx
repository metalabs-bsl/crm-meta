import { FC, useCallback, useState } from 'react';
import { Checkbox, Empty, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteDocMutation, useLazyDownloadFileQuery } from 'api/admin/document/document.api';
import { IDocument } from 'types/entities';
import { DownloadDelete } from '../DownloadDelete';
import { DocumentTableRow } from './DocumentTableRow';
import styles from './Document.module.scss';

interface IProps {
  data?: IDocument[];
}

export const DocumentTable: FC<IProps> = ({ data }) => {
  const notify = useNotify();
  const [selectedRow, setSelectedRow] = useState<IDocument | null>(null);
  const [downloadDocumentFile, { isLoading: isDownloadLoading }] = useLazyDownloadFileQuery();
  const [deleteDocument, { isLoading: isDeleteLoading }] = useDeleteDocMutation();

  const handleSelectRow = useCallback((document: IDocument) => {
    setSelectedRow((prev) => (prev?.id === document.id ? null : document));
  }, []);

  const handleDelete = () => {
    if (selectedRow) {
      deleteDocument(selectedRow?.id)
        .unwrap()
        .then(() => {
          setSelectedRow(null);
          notify(MESSAGE.DELETED, 'success');
        });
    }
  };

  const handleDownload = () => {
    if (selectedRow) {
      downloadDocumentFile({ id: selectedRow.files.id, original_name: selectedRow.files.original_name })
        .unwrap()
        .then(() => {
          setSelectedRow(null);
          notify(MESSAGE.DOWNLOAD, 'success');
        });
    }
  };

  return (
    <div className={styles.tableContainer}>
      <Loading isSpin={isDownloadLoading || isDeleteLoading}>
        {!!data?.length ? (
          <div className={styles.table}>
            <div className={styles.thead}>
              <div className={styles.theadCheckbox}>
                <Checkbox disabled />
              </div>
              <div className={`${styles.headTd} ${styles.id}`}>номер договора</div>
              <div className={`${styles.headTd} ${styles.name}`}>ФИО</div>
            </div>
            <div className={styles.tbody}>
              {data?.map((el, index) => (
                <DocumentTableRow key={index} data={el} isSelected={selectedRow?.id === el.id} onSelectRow={handleSelectRow} />
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )}
        {selectedRow && <DownloadDelete onDelete={handleDelete} onDownload={handleDownload} />}
      </Loading>
    </div>
  );
};
