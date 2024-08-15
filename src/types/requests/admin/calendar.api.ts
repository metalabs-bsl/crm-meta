import { ICalendarDataRes, Note } from 'types/entities';

export module IGetCalendar {
  export type Response = ICalendarDataRes;
  export type Params = void;
}

export module ICreateNote {
  export type Response = void;
  export type Params = Note;
}
