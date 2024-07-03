import { ChangeEvent, FC, useRef, useState } from 'react';
import { Icon } from '../Icon';
import styles from './style.module.scss';

interface FilePickerProps {
  onFilesSelect: (files: File[]) => void;
}

export const FilePicker: FC<FilePickerProps> = ({ onFilesSelect }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useRef(`file-upload-${Math.random().toString(36).substr(2, 9)}`).current;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
      onFilesSelect(selectedFiles);
    } else {
      setFiles([]);
      onFilesSelect([]);
    }
  };

  const handleFileDelete = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelect(newFiles);
    if (newFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.picker_container}>
      {files.length > 0 ? (
        <div className={styles.with_files}>
          {files.map((file, index) => (
            <div className={styles.fileBox} key={index}>
              <a href={URL.createObjectURL(file)} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
                {file.name}
              </a>
              <Icon type='delete' onClick={() => handleFileDelete(index)} />
            </div>
          ))}
          <label htmlFor={uniqueId} className={styles.custom_file_upload}>
            Выберите файлы
          </label>
        </div>
      ) : (
        <label htmlFor={uniqueId} className={styles.custom_file_upload}>
          Загрузить
        </label>
      )}
      <input id={uniqueId} type='file' multiple onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};
