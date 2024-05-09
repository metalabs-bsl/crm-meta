import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useGetExchangeRatesQuery } from 'api/admin/exchangeRates/exchangeRates.api';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { setChangeSidebarVisible } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import burger from '../../assets/icons/header/burger.png';
import userIcon from '../../assets/icons/header/user.png';
import logo from '../../assets/img/logo.png';
import styles from './styles.module.scss';

export const Header = () => {
  const currentTime = dayjs(new Date()).format('HH:mm');
  const dispatch = useAppDispatch();
  const { isShowSidebar } = useAppSelector(sidebarSelectors.sidebar);
  const { role } = useAppSelector(loginSelectors.login);
  const { data } = useGetExchangeRatesQuery();
  const onBurgerClick = () => {
    dispatch(setChangeSidebarVisible(!isShowSidebar));
  };

  if (role === ROLES.UNAUTHORIZED) {
    return null;
  }
  return (
    <header className={styles.header}>
      <img src={burger} alt='burger' className={styles.burger} onClick={onBurgerClick} />
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.exchangeRates}>
        Курс валют:{' '}
        <ul>
          <li>$ = {data ? data.usd : 0} </li>
          <li>euro = {data ? data.eur : 0} </li>
        </ul>
      </div>
      <span>{currentTime}</span>
      <img src={userIcon} alt='login' className={styles.userIcon} />
    </header>
  );
};
