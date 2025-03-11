import { Button, countries, countriesLower, Input } from '@/shared';
import { FC, FormEvent, memo, useRef, useState } from 'react';
import * as Yup from 'yup';
import styles from './uncontrolledForm.module.css';

export const UncontrolledForm: FC = memo(() => {
  const nameField = useRef<HTMLInputElement | null>(null);
  const ageField = useRef<HTMLInputElement | null>(null);
  const emailField = useRef<HTMLInputElement | null>(null);
  const passwordField = useRef<HTMLInputElement | null>(null);
  const confirmPasswordField = useRef<HTMLInputElement | null>(null);
  const manField = useRef<HTMLInputElement | null>(null);
  const femaleField = useRef<HTMLInputElement | null>(null);
  const acceptField = useRef<HTMLInputElement | null>(null);
  const fileField = useRef<HTMLInputElement | null>(null);
  const countryField = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<Record<string, string>>({});

  const schema = Yup.object().shape({
    username: Yup.string()
      .required('Name is required')
      .test({
        test: (value) => value[0] === value[0]?.toUpperCase(),
        message: 'The first letter must be capitalized',
      }),
    age: Yup.number()
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
      ),
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
      .test(
        'fileSize',
        'The file is too big (> 1 MB)',
        (value) => value && value.size <= 1048576
      )
      .test(
        'fileFormat',
        'Unsupported format (png | jpeg)',
        (value) => value && ['image/png', 'image/jpeg'].includes(value.type)
      ),
    country: Yup.string()
      .required('Country is required')
      .test({
        test: (value) =>
          !value || countriesLower.includes(value?.toLowerCase()),
        message: 'Such a country does not exist',
      }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(manField.current?.checked);
    console.log(femaleField.current?.checked);

    const formData = {
      username: nameField.current?.value,
      age: '-1',
      email: '1@',
      password: 'aA1',
      confirmPassword: 'aA1#',
      country: 'afhanistan',
      gender: '',
      accept: false,
      file: new File([''], 'filename.png', {
        type: 'image/pnga',
      }),
    };

    schema
      .validate(formData, { abortEarly: false })
      .then((a) => console.log('a', a))
      .catch((err: Yup.ValidationError) => {
        const error: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            error[e.path] = e.message;
          }
        });
        setError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <Input
        placeholder="Name"
        refInput={nameField}
        id="name"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.username}</p>
      <label className={styles.label} htmlFor="age">
        Age
      </label>
      <Input
        placeholder="Age"
        type="number"
        min={0}
        refInput={ageField}
        id="age"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.age}</p>
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <Input
        placeholder="Email"
        type="email"
        refInput={emailField}
        id="email"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.email}</p>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <Input
        placeholder="Password"
        type="password"
        refInput={passwordField}
        id="password"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.password}</p>
      <label className={styles.label} htmlFor="confirmPassword">
        Confirm Password
      </label>
      <Input
        placeholder="Confirm Password"
        type="password"
        refInput={confirmPasswordField}
        id="confirmPassword"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.confirmPassword}</p>
      <label className={styles.label}>Gender</label>
      <div>
        <input
          className={styles['custom-radio']}
          name="gender"
          type="radio"
          id="male"
          value="male"
          ref={manField}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className={styles.input}>
        <input
          className={styles['custom-radio']}
          name="gender"
          type="radio"
          id="female"
          value="female"
          ref={femaleField}
        />
        <label htmlFor="female">Female</label>
      </div>
      <p className={styles.error}>&nbsp;{error.gender}</p>
      <input
        type="checkbox"
        className={styles['custom-checkbox']}
        id="accept"
        name="accept"
        value="yes"
        ref={acceptField}
      />
      <label
        htmlFor="accept"
        className={[styles.labelCheckbox, styles.input].join(' ')}
      >
        I accept Terms and Conditions agreement
      </label>
      <p className={styles.error}>&nbsp;{error.accept}</p>
      <label className={styles.label} htmlFor="file">
        File
      </label>
      <Input
        type="file"
        refInput={fileField}
        id="file"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.file}</p>
      <label className={styles.label} htmlFor="country">
        Country
      </label>
      <Input
        refInput={countryField}
        list="countryList"
        placeholder="Country"
        id="country"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.country}</p>
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <Button className={styles.button}>Submit</Button>
    </form>
  );
});

UncontrolledForm.displayName = 'UncontrolledForm';
