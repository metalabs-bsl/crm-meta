import { FC, useRef, useState } from 'react';
import { Icon } from '../../../../../../../common/ui/Icon';
import styles from './styles.module.scss';

interface FilePickerProps {
  files: string[];
}

export const FilePicker: FC<FilePickerProps> = ({ files }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleFileDelete = () => {
    setFileName(null);
    setFileUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.picker_container}>
      {files.map((file) => (
        <div className={styles.fileBox} key={file}>
          <a href={fileUrl!} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
            {file}
          </a>
          <Icon type='delete' onClick={handleFileDelete} />
        </div>
      ))}
      {fileName ? (
        <div className={styles.with_file}>
          <div className={styles.fileBox}>
            <a href={fileUrl!} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
              {fileName}
            </a>
            <Icon type='delete' onClick={handleFileDelete} />
          </div>
          <label htmlFor='file-upload' className={styles.custom_file_upload}>
            Выберите файл
          </label>
        </div>
      ) : (
        <label htmlFor='file-upload' className={styles.custom_file_upload}>
          <Icon type='plus-gray' />
        </label>
      )}
      <input id='file-upload' type='file' onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};
