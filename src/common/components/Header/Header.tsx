import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { setChangeSidebarVisible } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import burger from '../../assets/icons/header/burger.png';
import userIcon from '../../assets/icons/header/user.png';
import logo from '../../assets/img/test-logo.png';
import styles from './styles.module.scss';

export const Header = () => {
  const currentTime = dayjs(new Date()).format('HH:mm');
  const dispatch = useAppDispatch();
  const { isShowSidebar } = useAppSelector(sidebarSelectors.sidebar);
  const { role } = useAppSelector(loginSelectors.login);
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
      <span>Курс валют: 1$ - 89сом</span>
      <span>{currentTime}</span>
      <img src={userIcon} alt='login' className={styles.userIcon} />
    </header>
  );
};
