import { ChangeEvent, FC, useCallback, useRef } from 'react';
import { Icon } from 'common/ui/Icon';
import styles from './styles.module.scss';

interface MultipleFilePickerProps {
  files: File[];
  editable: boolean;
  onFilesChange: (files: File[]) => void;
}

export const MultipleFilePicker: FC<MultipleFilePickerProps> = ({ files, editable, onFilesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useRef(`file-upload-${Math.random().toString(36).substr(2, 9)}`).current;

  console.log(files);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        // setFileUrl(URL.createObjectURL(file));
        onFilesChange([...files, file]);
      }
    },
    [files, onFilesChange]
  );

  const handleFileDelete = useCallback(
    (fileName: string) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      onFilesChange(updatedFiles);
    },
    [files, onFilesChange]
  );

  return (
    <div className={styles.picker_container}>
      {files.length ? (
        files.map((file) => (
          <div className={styles.fileBox} key={file.name}>
            <a href={URL.createObjectURL(file)} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
              {file.name}
            </a>
            {!editable && <Icon type='delete' onClick={() => handleFileDelete(file.name)} />}
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
