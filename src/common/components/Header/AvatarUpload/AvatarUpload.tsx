import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon, Loading } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useDeleteAvatarMutation, useUploadAvatarMutation } from 'api/admin/employees/employees.api';
import styles from './styles.module.scss';

interface IProps {
  file: undefined | string;
}

export const AvatarUpload: FC<IProps> = ({ file }) => {
  const notify = useNotify();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
  const [removeAvatar, { isLoading: isDeleteLoading }] = useDeleteAvatarMutation();

  useEffect(() => {
    if (file) {
      setAvatarUrl(`${process.env.REACT_APP_BASE_URL}/${file}`);
    }
  }, [file]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('file', file);
      uploadAvatar(formData)
        .unwrap()
        .then(() => {
          setAvatarUrl(imageUrl);
          notify(MESSAGE.SUCCESS, 'success');
        })
        .catch(() => notify(MESSAGE.ERROR, 'error'));
    }
  };

  const deleteAvatar = () => {
    removeAvatar()
      .unwrap()
      .then(() => {
        notify(MESSAGE.DELETED, 'success');
        setAvatarUrl(undefined);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
  };

  return (
    <div className={cn(styles.avatar, { [styles.hasPhoto]: avatarUrl })}>
      <Loading isSpin={isLoading || isDeleteLoading}>
        {avatarUrl && <Icon type='delete' className={styles.delete} onClick={deleteAvatar} />}
        {avatarUrl ? (
          <label htmlFor='avatarInput'>
            <img src={avatarUrl} alt='User Avatar' className={styles.userAvatar} />
          </label>
        ) : (
          <label htmlFor='avatarInput'>
            <Icon type='userIcon' className={styles.icon} />
          </label>
        )}
        <input
          ref={fileInputRef}
          type='file'
          id='avatarInput'
          accept='image/*'
          onChange={handleImageUpload}
          className={styles.avatarInput}
          hidden
        />
      </Loading>
    </div>
  );
};
