import { Icon } from 'common/ui';
import { useGetExchangeRatesQuery } from 'api/admin/exchangeRates/exchangeRates.api';
import styles from './style.module.scss';

export const ExtangesWindow = () => {
  const { data } = useGetExchangeRatesQuery();
  return (
    <table className={styles.extangesTable}>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Покупка</th>
          <th>Продажа</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles.flag}>
            <Icon type='usd' alt='usd' />
            USD
          </td>
          <td>{data?.usd || 0}</td>
          <td>{data?.usd || 0}</td>
        </tr>
        <tr>
          <td className={styles.flag}>
            <Icon type='eur' alt='eur' />
            EUR
          </td>
          <td>{data?.eur || 0}</td>
          <td>{data?.eur || 0}</td>
        </tr>
      </tbody>
    </table>
  );
};
