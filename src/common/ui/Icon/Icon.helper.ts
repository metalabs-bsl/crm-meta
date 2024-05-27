import { IIcons } from 'types/common';
import comment from '../../assets/icons/comment.svg';
import deleteIcon from '../../assets/icons/deleteIcon.svg';
import edit from '../../assets/icons/edit.svg';
import arrowDown from '../../assets/icons/header/arrow-down.svg';
import arrowUp from '../../assets/icons/header/arrow-up.svg';
import BurgerOpen from '../../assets/icons/header/burger.svg';
import activeBg from '../../assets/icons/header/checkIcon.svg';
import BurgerClose from '../../assets/icons/header/close.svg';
import eur from '../../assets/icons/header/euro.svg';
import playIcon from '../../assets/icons/header/playIcon.svg';
import startLine from '../../assets/icons/header/start-line.svg';
import timeoutPlayIcon from '../../assets/icons/header/timeout-playIcon.svg';
import usd from '../../assets/icons/header/usa.svg';
import link from '../../assets/icons/link.svg';
import plusGray from '../../assets/icons/plus-gray.svg';
import plusIcon from '../../assets/icons/plus-icon.svg';
import search from '../../assets/icons/searchIcon.svg';
import calendar from '../../assets/icons/sidebar/calendar.svg';
import calendarDark from '../../assets/icons/sidebar/calendar-dark.svg';
import crm from '../../assets/icons/sidebar/crm.svg';
import crmDark from '../../assets/icons/sidebar/crm-dark.svg';
import document from '../../assets/icons/sidebar/document.svg';
import documentDark from '../../assets/icons/sidebar/document-dark.svg';
import mail from '../../assets/icons/sidebar/mail.svg';
import mailDark from '../../assets/icons/sidebar/mail-dark.svg';
import userIcon from '../../assets/icons/userIcon.svg';

export const icons: IIcons = {
  ['arrow-down']: arrowDown,
  ['arrow-up']: arrowUp,
  ['burger-open']: BurgerOpen,
  ['burger-close']: BurgerClose,
  ['play']: playIcon,
  ['crm']: crm,
  ['calendar']: calendar,
  ['document']: document,
  ['mail']: mail,
  ['crm-dark']: crmDark,
  ['calendar-dark']: calendarDark,
  ['document-dark']: documentDark,
  ['mail-dark']: mailDark,
  ['timeout-playIcon']: timeoutPlayIcon,
  ['start-line']: startLine,
  ['active-bg']: activeBg,
  ['eur']: eur,
  ['usd']: usd,
  ['search']: search,
  ['plus-icon']: plusIcon,
  ['comment']: comment,
  ['plus-gray']: plusGray,
  ['userIcon']: userIcon,
  ['delete']: deleteIcon,
  ['edit']: edit,
  ['link']: link
};
