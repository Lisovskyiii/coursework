import * as Yup from 'yup';

export const validateSchemaReportForm = Yup.object({
  subject: Yup.string().required('Обязательное поле').min(2, 'Минимум 2 символа'),

  group: Yup.string().required('Обязательное поле'),

  dateStart: Yup.string().required('Обязательное поле')

  // file: Yup.mixed()
  //   .required('Загрузите фотографию')
  //   .test(
  //     'file-size',
  //     'Файл слишком большой (макс. 5MB)',
  //     (value) => value instanceof File && value.size <= 5 * 1024 * 1024 // 5MB
  //   )
  //   .test('file-type', 'Допустимы только JPEG, PNG или GIF', (value) => {
  //     if (value instanceof File) {
  //       const supportedTypes = ['image/jpeg', 'image/png', 'image/gif',
  // 'image/webp', 'image/jpg'];

  //       return supportedTypes.includes(value.type);
  //     }

  //     return false;
  //   })
});

export const validateSchemaLoginForm = Yup.object({
  email: Yup.string().required('Обязательное поле').email('Неверный формат email'),
  password: Yup.string().required('Обязательное поле')
});

export type ValidateSchemaReportType = typeof validateSchemaReportForm;
export type ValidateSchemaLoginType = typeof validateSchemaLoginForm;
