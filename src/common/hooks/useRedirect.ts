import { Search, useNavigate } from 'react-router-dom';
import { setPathIds } from 'common/helpers';
import { adminPath } from 'types/routes';

type Empty = Record<string, unknown>;
export type RedirectFn<T> = ({}: T & { search?: Search }) => void;

interface IRedirect {
  crm: RedirectFn<{ chapter: string }>;
  mail: RedirectFn<Empty>;
  document: RedirectFn<Empty>;
  report: RedirectFn<{ chapter: string }>;
  calendar: RedirectFn<Empty>;
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
    document: ({ search }) => {
      navigate({ pathname: adminPath.document, search });
    },
    calendar: ({ search }) => {
      navigate({ pathname: adminPath.calendar, search: search });
    },
    report: ({ chapter, search }) => {
      navigate({ pathname: setPathIds(adminPath.report, { chapter }), search });
    },
    // Move
    move: ({ number }) => navigate(number)
  };
};
