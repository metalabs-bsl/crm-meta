import { Column, DataColumn } from './types/types';

// список разделов таблице
export const columns: Column[] = [
  {
    title: 'ФИО',
    key: 'fullName'
  },
  {
    title: 'дата рождения',
    key: 'birthday',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },

  {
    title: 'статус',
    key: 'status',
    isEdit: {
      value: true,
      component: 'select'
    }
  },

  {
    title: 'номер телефона',
    key: 'phoneNumber',
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
    title: 'пароль',
    key: 'password',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'дата начала стажировки',
    key: 'startDateInternship',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },
  {
    title: 'дата начала работы',
    key: 'startDateWork',
    isEdit: {
      value: true,
      component: 'datepicker'
    }
  },
  {
    title: 'логин CRM',
    key: 'loginCRM',
    isEdit: {
      value: true,
      component: 'input'
    }
  },
  {
    title: 'пароль CRM',
    key: 'passwordCRM',
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

// данные таблицы
export const dataColumns: DataColumn[] = [
  {
    fullName: 'Almaz Almazov Almazovich',
    status: 'Менеджер руководитель',
    birthday: '04.07.2024T00:00',
    phoneNumber: '+996222123123',
    email: 'almaz@mail.ru',
    password: 'ISC12345',
    startDateInternship: '12.02.2024T00:00',
    startDateWork: '01.01.2024T00:00',
    loginCRM: 'test',
    passwordCRM: 'test',
    agreement: 'договор стажировки',
    passport: '123456789'
  },
  {
    fullName: 'Adil Adylov Adylovich',
    status: 'Менеджер',
    birthday: '04.07.2024T00:00',
    phoneNumber: '+996222123123',
    email: 'adyl@mail.ru',
    password: 'ISC12345',
    startDateInternship: '06.05.2024T00:00',
    startDateWork: '04.07.2024T00:00',
    loginCRM: 'test',
    passwordCRM: 'test',
    agreement: 'договор  работы',
    passport: '134501923'
  }
];
