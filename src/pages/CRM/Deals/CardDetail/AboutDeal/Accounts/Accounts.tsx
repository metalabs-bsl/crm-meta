import { AccountGroup } from './AccountGroup';
import { accountsData } from './Accounts.helper';
import { CreateFileForm } from './CreateFileForm';
import styles from './style.module.scss';

export const Accounts = () => {
  return (
    <div className={styles.accounts}>
      <CreateFileForm />
      {accountsData.map((group) => (
        <AccountGroup key={group.date} group={group} />
      ))}
    </div>
  );
};
