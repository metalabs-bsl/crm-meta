import { Icon, Loading } from 'common/ui';
import { useGetCurrenciesLastQuery } from 'api/admin/currencies/currencies.api';
import { IIconType } from 'types/common';
import styles from './style.module.scss';

interface IRow {
  icon: IIconType;
  title: string;
  items: (string | undefined)[];
}

export const CurrenciesWindow = () => {
  const { data, isFetching } = useGetCurrenciesLastQuery();

  const rows: IRow[] = [
    {
      icon: 'usd',
      title: 'USD',
      items: [data?.buyEUR, data?.buyUSD]
    },
    {
      icon: 'eur',
      title: 'EUR',
      items: [data?.sellEUR, data?.sellUSD]
    }
  ];

  return (
    <Loading isSpin={isFetching}>
      <table className={styles.extangesTable}>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Покупка</th>
            <th>Продажа</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className={styles.flag}>
                <Icon type={row.icon} alt={row.icon} />
                {row.title}
              </td>
              {row.items.map((item, ind) => (
                <td key={ind}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Loading>
  );
};
