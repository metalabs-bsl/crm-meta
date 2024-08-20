import { Search, useNavigate } from 'react-router-dom';
import { setPathIds } from 'common/helpers';
import { adminPath } from 'types/routes';

type Empty = Record<string, unknown>;
export type RedirectFn<T> = ({}: T & { search?: Search }) => void;

interface IRedirect {
  crm: RedirectFn<{ chapter: string }>;
  mail: RedirectFn<Empty>;
  mailDetail: RedirectFn<{ id: string }>;
  document: RedirectFn<Empty>;
  report: RedirectFn<{ chapter: string }>;
  calendar: RedirectFn<Empty>;
  settings: RedirectFn<Empty>;
  login: RedirectFn<Empty>;
  move: RedirectFn<{ number: number }>;
}

export const useRedirect = (): IRedirect => {
  const navigate = useNavigate();

  return {
    crm: ({ chapter, search }) => {
      navigate({ pathname: setPathIds(adminPath.crm, { chapter }), search });
    },
    mail: ({ search }) => {
      navigate({ pathname: adminPath.mail, search: search });
    },
    mailDetail: ({ id, search }) => {
      navigate({ pathname: setPathIds(adminPath.mailDetail, { id }), search: search });
    },
    document: ({ search }) => {
      navigate({ pathname: adminPath.document, search });
    },
    calendar: ({ search }) => {
      navigate({ pathname: adminPath.calendar, search: search });
    },
    settings: ({ search }) => {
      navigate({ pathname: adminPath.settings, search: search });
    },
    report: ({ chapter, search }) => {
      navigate({ pathname: setPathIds(adminPath.report, { chapter }), search });
    },
    login: ({ search }) => {
      navigate({ pathname: adminPath.login, search });
    },
    // Move
    move: ({ number }) => navigate(number)
  };
};
