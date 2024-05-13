import { Search, useNavigate } from 'react-router-dom';
import { setPathIds } from 'common/helpers';
import { adminPath } from 'types/routes';

type Empty = Record<string, unknown>;
export type RedirectFn<T> = ({}: T & { search?: Search }) => void;

interface IRedirect {
  crm: RedirectFn<{ chapter: string }>;
  mail: RedirectFn<Empty>;
  document: RedirectFn<{ chapter: string }>;
  calendar: RedirectFn<Empty>;
  move: RedirectFn<{ number: number }>;
}

export const useRedirect = (): IRedirect => {
  const navigate = useNavigate();

  return {
    crm: ({ chapter, search }) => {
      navigate({ pathname: setPathIds(adminPath.crm, { chapter }), search });
    },
    mail: (options) => {
      navigate({ pathname: adminPath.mail, search: options?.search });
    },
    document: ({ chapter, search }) => {
      navigate({ pathname: setPathIds(adminPath.document, { chapter }), search });
    },
    calendar: (options) => {
      navigate({ pathname: adminPath.calendar, search: options?.search });
    },
    // Move
    move: ({ number }) => navigate(number)
  };
};
