import { Change } from 'types/entities';

export const history: Record<string, Change[]> = {
  '2024-05-28': [
    {
      description: 'Стадия изменена',
      timestamp: '10:00',
      status: 'history-edit',
      detail: {
        detailType: 'edit-status',
        prev: {
          color: 'salat',
          label: 'Поступили'
        },
        current: {
          color: 'blue',
          label: 'Взят в обработку'
        }
      }
    },
    {
      description: 'Наименование',
      timestamp: '12:00',
      status: 'history-edit',
      detail: {
        detailType: 'edit-naming',
        prev: 'Meta',
        current: 'MetaLabs'
      }
    },
    {
      description: 'Договор',
      timestamp: '12:00',
      status: 'history-edit',
      detail: {
        detailType: 'edit-other',
        items: [
          {
            title: 'ИНН',
            prev: '1234567890',
            current: '0987654321'
          },
          {
            title: 'Комментарий',
            prev: 'Прищельцы атакуют!',
            current: 'Ложная тревога'
          }
        ]
      }
    }
  ],
  '2024-05-15': [
    {
      description: 'Создание',
      timestamp: '11:11',
      status: 'history-todo',
      detail: {
        detailType: 'todo-create',
        comment: 'Ограничить права прищелцев на планете Пандора.',
        dedlineDate: '2024-05-09T11:11'
      }
    },
    {
      description: 'Стадия изменена',
      timestamp: '11:11',
      status: 'history-todo',
      detail: {
        detailType: 'todo-status',
        prev: {
          label: 'На сегодня',
          color: 'light-green'
        },
        current: {
          label: 'На этой неделе',
          color: 'blue'
        }
      }
    }
  ],
  '2024-05-12': [
    {
      description: 'Создание',
      timestamp: '11:11',
      status: 'history-accounts',
      detail: {
        detailType: 'accounts-create',
        payment: 'Первая часть',
        comment: 'Срок оплаты руководителя 25 июля',
        file: {
          fileName: 'Счет об оплате первая часть.jpg',
          fileUrl: 'https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp'
        }
      }
    },
    {
      description: 'Удаление',
      timestamp: '11:11',
      status: 'history-accounts',
      detail: {
        detailType: 'accounts-delete',
        payment: 'Первая часть',
        comment: 'Срок оплаты руководителя 25 июля',
        file: {
          fileName: 'Счет об оплате первая часть.jpg',
          fileUrl: 'https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp'
        }
      }
    }
  ],
  '2024-05-09': [{ description: 'Пришельцы атакуют!', timestamp: '11:11', status: 'history-comment' }],
  '2024-05-08': [
    {
      description: 'Создание',
      timestamp: '14:00',
      status: 'history-deal',
      detail: {
        detailType: 'deals-create',
        title: 'MetaLabs'
      }
    },
    {
      description: 'Статус оплаты',
      timestamp: '14:00',
      status: 'history-deal',
      detail: {
        detailType: 'deals-status',
        prev: {
          label: 'Не выбрано',
          color: 'not-paid'
        },
        current: {
          label: 'Оплачено',
          color: 'paid'
        }
      }
    },
    {
      description: 'Переназначение ответственного',
      timestamp: '14:00',
      status: 'history-deal',
      detail: {
        detailType: 'deals-responsible',
        prev: 'Азатов Азат Азатович',
        current: 'Абджупаров Максат'
      }
    },
    {
      description: 'Калькулятор',
      timestamp: '14:00',
      status: 'history-deal',
      detail: {
        detailType: 'deals-calc',
        prev: {
          label: 'Доступ открыт',
          icon: 'calc-open'
        },
        current: {
          label: 'Доступ закрыт',
          icon: 'calc-close'
        }
      }
    }
  ]
};
