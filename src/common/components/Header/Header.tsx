import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useGetExchangeRatesQuery } from 'api/admin/exchangeRates/exchangeRates.api';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { setChangeSidebarVisible } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import { DropdownModal } from '../DropdownModal';
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
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const timeRef = useRef(null);
  const profileRef = useRef(null);

  const onBurgerClick = () => {
    dispatch(setChangeSidebarVisible(!isShowSidebar));
  };

  if (role === ROLES.UNAUTHORIZED) {
    return null;
  }

  const openTimeModal = () => {
    setIsTimeModalOpen(!isTimeModalOpen);
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

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
      <span ref={timeRef} onClick={openTimeModal}>
        {currentTime}
      </span>
      <DropdownModal isOpen={isTimeModalOpen} targetRef={timeRef} onClose={closeTimeModal}>
        <div className={styles.timeContent}>
          <button>Начать рабочий день</button>
          <button>Перерыв</button>
          <span>Время - 00:00</span>
        </div>
      </DropdownModal>

      <img onClick={openProfileModal} ref={profileRef} src={userIcon} alt='login' className={styles.userIcon} />
      <DropdownModal isOpen={isProfileModalOpen} targetRef={profileRef} onClose={closeProfileModal}>
        <div className={styles.timeContent}>
          <ul>
            <li>Имя: Тариэл</li>
            <li>Фамилия: Таиров</li>
            <li>Номер телефона: +996704135830</li>
            <li>Email: tarieltairov1@gmail.com</li>
            <li>Статус: admin</li>
          </ul>
          <button>Выйти</button>
        </div>
      </DropdownModal>
    </header>
  );
};
