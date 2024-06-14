import { ChangeEvent, FC } from 'react';
import { Icon } from 'common/ui/Icon';
import styles from './styles.module.scss';

interface FilePickerProps {
  files: string[];
  editable: boolean;
  onFilesChange: (files: string[]) => void;
}

export const FilePicker: FC<FilePickerProps> = ({ files, editable, onFilesChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      onFilesChange([...files, newFile.name]);
    }
  };

  const handleFileDelete = (fileName: string) => {
    const updatedFiles = files.filter((file) => file !== fileName);
    onFilesChange(updatedFiles);
  };

  return (
    <div className={styles.picker_container}>
      {files.map((file) => (
        <div className={styles.fileBox} key={file}>
          <a href={file} target='_blank' rel='noopener noreferrer' className={styles.fileName}>
            {file}
          </a>
          {!editable && <Icon type='delete' onClick={() => handleFileDelete(file)} />}
        </div>
      ))}
      {!editable && (
        <label htmlFor='file-upload' className={styles.custom_file_upload}>
          <Icon type='plus-gray' />
        </label>
      )}
      <input id='file-upload' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};
