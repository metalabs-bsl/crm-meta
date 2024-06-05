import { IIcons } from 'types/common';
import calendarOutline from '../../assets/icons/calendar-outline.svg';
import comment from '../../assets/icons/comment.svg';
import countMinusActive from '../../assets/icons/count-minus-active.svg';
import countMinusUnActive from '../../assets/icons/count-minus-unactive.svg';
import countPlusActive from '../../assets/icons/count-plus-active.svg';
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
import historyAcconts from '../../assets/icons/history/accoounts.svg';
import ArrowLeft from '../../assets/icons/history/arrow-left.svg';
import clip from '../../assets/icons/history/clip.svg';
import historyComment from '../../assets/icons/history/comment.svg';
import historyDeals from '../../assets/icons/history/created-deals.svg';
import historyEdit from '../../assets/icons/history/edit.svg';
import historyTodo from '../../assets/icons/history/todo.svg';
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
  ['link']: link,
  ['history-edit']: historyEdit,
  ['history-todo']: historyTodo,
  ['history-accounts']: historyAcconts,
  ['history-comment']: historyComment,
  ['history-deal-create']: historyDeals,
  ['arrow-left']: ArrowLeft,
  ['clip']: clip,
  ['calendar-outline']: calendarOutline,
  ['count-plus-active']: countPlusActive,
  ['count-minus-active']: countMinusActive,
  ['count-minus-unactive']: countMinusUnActive
};
