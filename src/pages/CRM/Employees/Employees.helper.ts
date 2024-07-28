import { Column } from './types/types';

// список разделов таблице
export const columns: Column[] = [
  {
    title: 'Фамилия',
    key: 'second_name'
  },
  {
    title: 'Имя',
    key: 'first_name'
  },
  {
    title: 'Отчество',
    key: 'middle_name'
  },
  {
    title: 'дата рождения',
    key: 'date_of_birth',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },

  {
    title: 'статус',
    key: 'job_title',
    isEdit: {
      value: true,
      component: 'select'
    }
  },

  {
    title: 'номер телефона',
    key: 'phone',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'почта',
    key: 'email',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'пароль от почты',
    key: 'email_password',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'дата начала стажировки',
    key: 'start_of_internship',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },
  {
    title: 'дата начала работы',
    key: 'start_of_work',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },
  {
    title: 'логин CRM',
    key: 'login',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'пароль CRM',
    key: 'password',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'договор',
    key: 'agreement',
    isEdit: {
      value: true,
      component: 'file'
    }
  },
  {
    title: 'ID паспорт',
    key: 'passport',
    isEdit: {
      value: true,
      component: 'file'
    }
  }
];

export const getEngStatus = (rusStatus: string) => {
  switch (rusStatus) {
    case 'Стажёр':
      return 'Intern';
    case 'Менеджер':
      return 'Manager';
    case 'Менеджер-руководитель':
      return 'Senior Manager';
    case 'Руководитель':
      return 'Director';
  }
};

// export const getRusStatus = (engStatus: string) => {
//   switch (engStatus) {
//     case 'Intern':
//       return 'Стажёр';
//     case 'Manager':
//       return 'Менеджер';
//     case 'Senior Manager':
//       return 'Менеджер-руководитель';
//     case 'Director':
//       return 'Руководитель';
//   }
// };

// данные таблицы
// export const dataColumns: DataColumn[] = [
//   {
//     fullName: 'Almaz Almazov Almazovich',
//     status: 'Менеджер руководитель',
//     birthday: '04.07.2024T00:00',
//     phoneNumber: '+996222123123',
//     email: 'almaz@mail.ru',
//     password: 'ISC12345',
//     startDateInternship: '12.02.2024T00:00',
//     startDateWork: '01.01.2024T00:00',
//     loginCRM: 'test',
//     passwordCRM: 'test',
//     agreement: 'договорстажирdfsdfsfdовки.jpg',
//     passport: '123456789.jpg'
//   },
//   {
//     fullName: 'Adil Adylov Adylovich',
//     status: 'Менеджер',
//     birthday: '04.07.2024T00:00',
//     phoneNumber: '+996222123123',
//     email: 'adyl@mail.ru',
//     password: 'ISC12345',
//     startDateInternship: '06.05.2024T00:00',
//     startDateWork: '04.07.2024T00:00',
//     loginCRM: 'test',
//     passwordCRM: 'test',
//     agreement: 'договор работы.jpg',
//     passport: '134501923.jpg'
//   }
// ];
