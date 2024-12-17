import { Birthday, Note } from 'types/entities';
import { setBirthdays, setLoading, setNotes } from './calendar.slice';

import { AppDispatch } from 'api';
import { sendMessage } from 'socket';

export const setCalendarNotes = (message: Note[]) => (dispatch: AppDispatch) => {
  dispatch(setNotes(message));
  dispatch(setLoading(false));
};

export const setCalendarBirthdays = (message: Birthday[]) => (dispatch: AppDispatch) => {
  dispatch(setBirthdays(message));
  dispatch(setLoading(false));
};

export const sendNotesUpdate = (notes: Note[]) => (dispatch: AppDispatch) => {
  sendMessage('updateNotes', notes);
  dispatch(setNotes(notes));
  dispatch(setLoading(false));
};

export const sendBirthdaysUpdate = (birthdays: Birthday[]) => (dispatch: AppDispatch) => {
  sendMessage('updateBirthdays', birthdays);
  dispatch(setBirthdays(birthdays));
  dispatch(setLoading(false));
};
