export const fieldsReport = [
  {
    type: 'text',
    name: 'subject',
    label: 'Дисциплина'
  },
  {
    type: 'text',
    name: 'group',
    label: 'Учебная группа'
  },
  {
    type: 'number',
    name: 'audience',
    label: 'Номер аудитории'
  }
];

export const fieldsLogin = [
  { type: 'text', name: 'email', label: 'Логин', autoComplete: 'username' },
  { type: 'password', name: 'password', label: 'Пароль', autoComplete: 'current-password' }
];
