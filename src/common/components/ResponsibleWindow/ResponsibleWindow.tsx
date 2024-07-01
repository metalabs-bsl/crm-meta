import { FC } from 'react';
import styles from './style.module.scss';

interface IUser {
  firstName: string;
  lastName: string;
}

interface ClientProps {
  data: IUser;
}

export const ResponsibleWindow: FC<ClientProps> = ({ data }) => {
  const { firstName, lastName } = data;

  return (
    <div className={styles.wrapper}>
      <p>Ответственный</p>
      <p className={styles.name}>
        {firstName}
        {lastName}
      </p>
    </div>
  );
};
