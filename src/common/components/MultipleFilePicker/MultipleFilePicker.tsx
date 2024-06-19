import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { Icon } from 'common/ui/Icon';
import styles from './styles.module.scss';

interface MultipleFilePickerProps {
  files: string[];
  editable: boolean;
  onFilesChange: (files: string[]) => void;
}

export const MultipleFilePicker: FC<MultipleFilePickerProps> = ({ files, editable, onFilesChange }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useRef(`file-upload-${Math.random().toString(36).substr(2, 9)}`).current;

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setFileUrl(URL.createObjectURL(file));
        onFilesChange([...files, file.name]);
      }
    },
    [files, onFilesChange]
  );

  const handleFileDelete = useCallback(
    (fileName: string) => {
      const updatedFiles = files.filter((file) => file !== fileName);
      onFilesChange(updatedFiles);
    },
    [files, onFilesChange]
  );

  return (
    <div className={styles.picker_container}>
      {files.length ? (
        files.map((file) => (
          <div className={styles.fileBox} key={file}>
            <a href={fileUrl!} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
              {file}
            </a>
            {!editable && <Icon type='delete' onClick={() => handleFileDelete(file)} />}
          </div>
        ))
      ) : (
        <span className={styles.fileName}>Файлы не загружены</span>
      )}
      {!editable && (
        <label htmlFor={uniqueId} className={styles.custom_file_upload}>
          <Icon type='plus-gray' />
        </label>
      )}
      <input id={uniqueId} type='file' onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};
