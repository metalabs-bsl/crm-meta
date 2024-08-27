import { FC, useCallback, useState } from 'react';
import { Checkbox, Empty, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteDocMutation, useLazyDownloadFileQuery } from 'api/admin/document/document.api';
import { IDocument } from 'types/entities';
import { DownloadDelete } from '../DownloadDelete';
import { OriginalTableRow } from './OriginalTableRow';
import styles from './styles.module.scss';

interface OriginalTableProps {
  originalData?: IDocument[];
}

export const OriginalTable: FC<OriginalTableProps> = ({ originalData }) => {
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
    <div className={styles.original}>
      <Loading isSpin={isDeleteLoading || isDownloadLoading}>
        {!!originalData?.length ? (
          <>
            <div className={styles.originalHead}>
              <div className={`${styles.originalTitle} ${styles.checkbox}`}>
                <Checkbox disabled />
              </div>
              <div className={`${styles.originalTitle} ${styles.naming}`}>название договора</div>
            </div>
            <div className={styles.originalBody}>
              {originalData?.map((el, index) => (
                <OriginalTableRow key={index} originalData={el} isSelected={selectedRow?.id === el.id} onSelectRow={handleSelectRow} />
              ))}
            </div>
          </>
        ) : (
          <Empty />
        )}
        {selectedRow && <DownloadDelete onDelete={handleDelete} onDownload={handleDownload} />}
      </Loading>
    </div>
  );
};
