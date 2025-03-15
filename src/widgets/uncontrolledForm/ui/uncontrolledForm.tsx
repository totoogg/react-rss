import {
  addData,
  Button,
  countries,
  Input,
  schema,
  useAppDispatch,
} from '@/shared';
import { FC, FormEvent, memo, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import styles from './uncontrolledForm.module.css';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username: nameField.current?.value || '',
      age: ageField.current?.value || '',
      email: emailField.current?.value || '',
      password: passwordField.current?.value || '',
      confirmPassword: confirmPasswordField.current?.value || '',
      gender: manField.current?.checked
        ? 'Male'
        : femaleField.current?.checked
          ? 'Female'
          : '',
      accept: acceptField.current?.checked || '',
      file: fileField.current?.files?.[0] || '',
      country: countryField.current?.value || '',
    };

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setError({});
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            addData({
              ...formData,
              file: reader.result as string,
            })
          );
          navigate('/');
        };
        if (fileField.current?.files?.[0]) {
          reader.readAsDataURL(fileField.current.files[0]);
        }
      })
      .catch((err: ValidationError) => {
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
        Name*
      </label>
      <Input
        placeholder="Name"
        refInput={nameField}
        id="name"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.username}</p>
      <label className={styles.label} htmlFor="age">
        Age*
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
        Email*
      </label>
      <Input
        placeholder="Email"
        type="text"
        refInput={emailField}
        id="email"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.email}</p>
      <label className={styles.label} htmlFor="password">
        Password*
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
        Confirm Password*
      </label>
      <Input
        placeholder="Confirm Password"
        type="password"
        refInput={confirmPasswordField}
        id="confirmPassword"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{error.confirmPassword}</p>
      <label className={styles.label}>Gender*</label>
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
        I accept Terms and Conditions agreement*
      </label>
      <p className={styles.error}>&nbsp;{error.accept}</p>
      <label className={styles.label} htmlFor="file">
        File*
      </label>
      <Input
        type="file"
        refInput={fileField}
        id="file"
        className={styles.input}
        accept=".jpeg, .png"
      />
      <p className={styles.error}>&nbsp;{error.file}</p>
      <label className={styles.label} htmlFor="country">
        Country*
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
