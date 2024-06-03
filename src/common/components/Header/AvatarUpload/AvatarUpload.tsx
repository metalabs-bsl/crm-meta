import { ChangeEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { Icon } from 'common/ui';
import styles from './styles.module.scss';

export const AvatarUpload = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const deleteAvatar = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn(styles.avatar, { [styles.hasPhoto]: avatarUrl })}>
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
    </div>
  );
};
