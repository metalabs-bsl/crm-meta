import { FC } from 'react';
import { Checkbox } from 'common/ui';
import { IDocument } from 'types/entities';
import styles from './styles.module.scss';

interface IProps {
  data: IDocument;
  isSelected: boolean;
  onSelectRow: (doc: IDocument) => void;
}

export const DocumentTableRow: FC<IProps> = ({ data, isSelected, onSelectRow }) => {
  const { contract_number, name } = data;

  return (
    <div className={styles.bodyTr}>
      <div className={styles.rowCheckbox}>
        <Checkbox checked={isSelected} onChange={() => onSelectRow(data)} />
      </div>
      <div className={styles.content}>
        <div className={`${styles.bodyTd} ${styles.id}`}>{contract_number}</div>
        <div className={`${styles.bodyTd} ${styles.name}`}>{name}</div>
      </div>
    </div>
  );
};
