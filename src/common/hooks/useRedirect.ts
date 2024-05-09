import { Search, useNavigate } from 'react-router-dom';
import { adminPath } from 'types/routes';

type Empty = Record<string, unknown>;
type RedirectFn<T> = ({}: T & { search?: Search }) => void;

interface IRedirect {
  crm: RedirectFn<Empty>;
  mail: RedirectFn<Empty>;
  document: RedirectFn<Empty>;
  calendar: RedirectFn<Empty>;
  move: RedirectFn<{ number: number }>;
}

export const useRedirect = (): IRedirect => {
  const navigate = useNavigate();

  return {
    crm: (options) => {
      navigate({ pathname: adminPath.main, search: options?.search });
    },
    mail: (options) => {
      navigate({ pathname: adminPath.mail, search: options?.search });
    },
    document: (options) => {
      navigate({ pathname: adminPath.document, search: options?.search });
    },
    calendar: (options) => {
      navigate({ pathname: adminPath.calendar, search: options?.search });
    },
    // Move
    move: ({ number }) => navigate(number)
  };
};
