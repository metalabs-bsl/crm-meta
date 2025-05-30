export interface Note {
  title: string;
  geolocation: string;
  date: string;
  reminderTypes: number[];
  employees: string[];
  canEdit?: boolean;
  id?: string;
}

export interface Birthday {
  name: string;
  date: string;
  phone: string;
  type: number;
}

export interface ICalendarDataRes {
  birthdays: Birthday[];
  notes: Note[];
}
