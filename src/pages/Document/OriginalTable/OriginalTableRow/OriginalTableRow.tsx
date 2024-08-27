import { FC } from 'react';
import { Checkbox } from 'common/ui';
import { IDocument } from 'types/entities';
import styles from './styles.module.scss';

interface OriginalTableRowProps {
  originalData: IDocument;
  isSelected: boolean;
  onSelectRow: (index: IDocument) => void;
}

export const OriginalTableRow: FC<OriginalTableRowProps> = ({ originalData, isSelected, onSelectRow }) => {
  const { name } = originalData;
  return (
    <div className={styles.originalRow}>
      <div className={`${styles.rowTitle} ${styles.checkbox}`}>
        <Checkbox checked={isSelected} onChange={() => onSelectRow(originalData)} />
      </div>
      <div className={`${styles.rowTitle} ${styles.naming}`}>
        <p>{name ?? 'Нет названия'}</p>
      </div>
    </div>
  );
};
