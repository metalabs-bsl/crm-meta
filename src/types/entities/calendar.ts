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

export interface LeadFly {
  lead_id: string;
  lead_name: string;
  phone: string;
  departure_date: string;
  departure_time: string;
  destination: string;
  destination_date: string;
  destination_time: string;
  departure_city: string;
}

export interface ICalendarDataRes {
  birthdays: Birthday[];
  notes: Note[];
}
