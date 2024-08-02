import { useLocation } from 'react-router-dom';
import { Loading } from 'common/ui';
import { useGetInvoicesQuery } from 'api/admin/leads/endpoints/invoice';
import { AccountItem } from './AccountItem';
import { CreateFileForm } from './CreateFileForm';
import styles from './style.module.scss';

export const Accounts = () => {
  const { search } = useLocation();
  const leadId = search.substring(1);
  const { data, isFetching } = useGetInvoicesQuery(leadId);

  return (
    <div className={styles.accounts}>
      <Loading isSpin={isFetching}>
        <CreateFileForm leadId={leadId} />
        {data?.map((item) => <AccountItem key={item.id} item={item} />)}
      </Loading>
    </div>
  );
};
