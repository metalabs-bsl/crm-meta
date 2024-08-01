import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { IPassportResponse } from 'types/entities';
import { Icon } from '../Icon';
import styles from './style.module.scss';
interface FilePickerProps {
  disabled?: boolean;
  onDelete?: () => void;
  onChange?: (file: File | null) => void;
  defaultValue?: IPassportResponse;
}

export const FilePicker: React.FC<FilePickerProps> = ({ onChange, disabled = false, defaultValue, onDelete }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useRef(`file-upload-${Math.random().toString(36).substr(2, 9)}`).current;

  useEffect(() => {
    if (defaultValue) {
      setFileName(defaultValue.original_name);
      setFileUrl(`${process.env.REACT_APP_BASE_URL}/${defaultValue.path}`);
    }
  }, [defaultValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      onChange && onChange(file);
    }
  };

  const handleFileDelete = () => {
    if (!disabled) {
      setFileName(null);
      setFileUrl(null);
      onChange && onChange(null);
      onDelete && onDelete();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={styles.picker_container}>
      {fileName ? (
        <div className={styles.with_file}>
          <div className={styles.fileBox}>
            <a href={fileUrl!} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
              {fileName}
            </a>
            <Icon type='delete' onClick={handleFileDelete} className={cn({ [styles.disabled]: disabled })} />
          </div>
          <label htmlFor={uniqueId} className={cn(styles.custom_file_upload, { [styles.disabled]: disabled })}>
            Выберите файл
          </label>
        </div>
      ) : (
        <label htmlFor={uniqueId} className={cn(styles.custom_file_upload, { [styles.disabled]: disabled })}>
          Загрузить
        </label>
      )}
      <input id={uniqueId} type='file' onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} disabled={disabled} />
    </div>
  );
};
