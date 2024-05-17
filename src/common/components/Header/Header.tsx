import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Icon } from 'common/ui';
import { useAppDispatch, useAppSelector } from 'common/hooks';
// import { useGetExchangeRatesQuery } from 'api/admin/exchangeRates/exchangeRates.api';
import { loginSelectors } from 'api/admin/login/login.selectors';
import { sidebarSelectors } from 'api/admin/sidebar/sidebar.selectors';
import { setChangeSidebarVisible } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import { DropdownModal } from '../DropdownModal';
import { ProfileWindow } from './ProfileWindow/ProfileWindow';
import logo from '../../assets/icons/header/logo.svg';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

export const Header = () => {
  const currentTime = dayjs(new Date()).format('HH:mm');
  const dispatch = useAppDispatch();
  const { isShowSidebar } = useAppSelector(sidebarSelectors.sidebar);
  const { role } = useAppSelector(loginSelectors.login);
  // const { data } = useGetExchangeRatesQuery();
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isExtangesOpen, setIsExtangesOpen] = useState<boolean>(false);
  const [isBgOpen, setIsBgOpen] = useState<boolean>(false);
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

  const openExtangesModal = () => {
    setIsExtangesOpen(!isExtangesOpen);
  };

  // const closeExtangesModal = () => {
  //   setIsExtangesOpen(false);
  // };

  const openBgModal = () => {
    setIsBgOpen(!isBgOpen);
  };

  // const closeBgModal = () => {
  //   setIsBgOpen(false);
  // };

  return (
    <header className={styles.header}>
      <div className={styles.logoBlock}>
        <Icon type={`burger-${isShowSidebar ? 'open' : 'close'}`} onClick={onBurgerClick} className={styles.burger} alt='burger' />
        <img src={logo} alt='logo' className={styles.logo} />
      </div>
      <div className={styles.otherBlock}>
        <div className={styles.exchangeRates} onClick={openExtangesModal}>
          <span>Курсы валют</span>
          <Icon type={`arrow-${isExtangesOpen ? 'up' : 'down'}`} alt='arrow' style={{ fill: 'red' }} />
        </div>
        <div className={styles.timeBlock} onClick={openTimeModal} ref={timeRef}>
          <span className={styles.time}>{currentTime}</span>
          <div className={styles.start}>
            <button className={styles.playBtn}>
              <Icon type='play' alt='play-icon' />
            </button>
            Начать
          </div>
          <DropdownModal isOpen={isTimeModalOpen} targetRef={timeRef} onClose={closeTimeModal}>
            <div className={styles.timeContent}>
              <button>Начать рабочий день</button>
              <button>Перерыв</button>
              <span>Время - 00:00</span>
            </div>
          </DropdownModal>
        </div>
        <div className={styles.exchangeRates} onClick={openBgModal}>
          <span>Фон</span>
          <Icon type={`arrow-${isBgOpen ? 'up' : 'down'}`} alt='arrow' />
        </div>

        <Button text='Профиль' type={BUTTON_TYPES.GRAY} onClick={openProfileModal} ref={profileRef} />

        <DropdownModal isOpen={isProfileModalOpen} targetRef={profileRef} onClose={closeProfileModal}>
          <ProfileWindow />
        </DropdownModal>
      </div>
    </header>
  );
};
