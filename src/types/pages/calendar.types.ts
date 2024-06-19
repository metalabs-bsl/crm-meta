export interface Options {
  label: string;
  value: string | number;
}

export interface Note {
  title: string;
  geolocation: string;
  date: string;
  reminder: Options[];
  user: string;
}

export interface Birthday {
  name: string;
  date: string;
  phone: string;
}
