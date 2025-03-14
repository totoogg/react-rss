import {
  addData,
  Button,
  countries,
  Input,
  schema,
  useAppDispatch,
} from '@/shared';
import { FC, memo } from 'react';
import styles from './controlledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

export const ControlledForm: FC = memo(() => {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: {
    accept?: boolean | undefined;
    username: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    file: File;
    country: string;
  }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        addData({
          ...data,
          age: String(data.age),
          accept: data.accept ? 'true' : 'false',
          file: reader.result as string,
        })
      );
      navigate('/');
    };
    if (data.file) {
      reader.readAsDataURL(data.file);
    }
  };

  const handleButtonClick = async () => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label} htmlFor="name">
        Name*
      </label>
      <Input
        placeholder="Name"
        {...register('username')}
        id="name"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.username?.message}</p>
      <label className={styles.label} htmlFor="age">
        Age*
      </label>
      <Input
        placeholder="Age"
        type="number"
        min={0}
        {...register('age')}
        id="age"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.age?.message}</p>
      <label className={styles.label} htmlFor="email">
        Email*
      </label>
      <Input
        placeholder="Email"
        type="email"
        {...register('email')}
        id="email"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.email?.message}</p>
      <label className={styles.label} htmlFor="password">
        Password*
      </label>
      <Input
        placeholder="Password"
        type="password"
        {...register('password')}
        id="password"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.password?.message}</p>
      <label className={styles.label} htmlFor="confirmPassword">
        Confirm Password*
      </label>
      <Input
        placeholder="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        id="confirmPassword"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.confirmPassword?.message}</p>
      <label className={styles.label}>Gender*</label>
      <div>
        <input
          className={styles['custom-radio']}
          type="radio"
          id="male"
          value="Male"
          {...register('gender')}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className={styles.input}>
        <input
          className={styles['custom-radio']}
          type="radio"
          id="female"
          value="Female"
          {...register('gender')}
        />
        <label htmlFor="female">Female</label>
      </div>
      <p className={styles.error}>&nbsp;{errors.gender?.message}</p>
      <input
        type="checkbox"
        className={styles['custom-checkbox']}
        id="accept"
        value="true"
        {...register('accept')}
      />
      <label
        htmlFor="accept"
        className={[styles.labelCheckbox, styles.input].join(' ')}
      >
        I accept Terms and Conditions agreement*
      </label>
      <p className={styles.error}>&nbsp;{errors.accept?.message}</p>
      <label className={styles.label} htmlFor="file">
        File*
      </label>
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <Input
            type="file"
            id="file"
            className={styles.input}
            accept=".jpeg, .png"
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />
        )}
      />
      <p className={styles.error}>&nbsp;{errors.file?.message}</p>
      <label className={styles.label} htmlFor="country">
        Country*
      </label>
      <Input
        {...register('country')}
        list="countryList"
        placeholder="Country"
        id="country"
        className={styles.input}
      />
      <p className={styles.error}>&nbsp;{errors.country?.message}</p>
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <Button
        type="button"
        className={styles.button}
        disabledCustom={!isValid}
        onClick={handleButtonClick}
      >
        Submit
      </Button>
    </form>
  );
});

ControlledForm.displayName = 'ControlledForm';
