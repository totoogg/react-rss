import { countriesLower } from '@/shared/constants/countries';
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .test({
      test: (value) => value[0] === value[0]?.toUpperCase(),
      message: 'The first letter must be capitalized',
    }),
  age: Yup.number()
    .typeError('Age is required')
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      'Password must have 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
    )
    .test('passwordRequired', 'Password is required', (value) => !!value),
  confirmPassword: Yup.string()
    .required('Confirm password')
    .test('passwords-match', 'The passwords do not match', function (value) {
      return !value || this.parent.password === value;
    }),
  gender: Yup.string().required('Gender is required'),
  accept: Yup.boolean().oneOf(
    [true],
    'You must accept Terms and Conditions agreement'
  ),
  file: Yup.mixed<File>()
    .required('File is required')
    .test('fileSize', 'The file is too big (> 1 MB)', (value) => {
      return value && value.size <= 1048576;
    })
    .test('fileFormat', 'Unsupported format (png | jpeg)', (value) => {
      return value && ['image/png', 'image/jpeg'].includes(value.type);
    })
    .test('fileRequired', 'File is required', (value) => !!value),
  country: Yup.string()
    .required('Country is required')
    .test({
      test: (value) => !value || countriesLower.includes(value?.toLowerCase()),
      message: 'Such a country does not exist',
    }),
});
