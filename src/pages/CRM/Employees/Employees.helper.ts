// список колонок таблицы
export const columns: string[] = [
  'ФИО',
  'дата рождения',
  'статус',
  'номер телефона',
  'почта',
  'пароль от почты',
  'дата начала стажировки',
  'дата начала работы',
  'логин CRM',
  'пароль CRM',
  'договор',
  'ID лицевая сторона',
  'ID обратная сторона'
];

export const getEngRole = (rusStatus: string) => {
  switch (rusStatus) {
    case 'Стажёр':
      return 'Intern';
    case 'Менеджер':
      return 'Manager';
    case 'Менеджер-руководитель':
      return 'Senior Manager';
    case 'Руководитель':
      return 'Director';
    default:
      return '';
  }
};

export const getRusRole = (engStatus: string) => {
  switch (engStatus) {
    case 'Intern':
      return 'Стажёр';
    case 'Manager':
      return 'Менеджер';
    case 'Senior Manager':
      return 'Менеджер-руководитель';
    case 'Director':
      return 'Руководитель';
    default:
      return '';
  }
};
