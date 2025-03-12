import { Data, selectData, useAppSelector } from '@/shared';
import { FC, memo } from 'react';
import styles from './content.module.css';

export const Content: FC = memo(() => {
  const data = useAppSelector(selectData);

  return (
    <>
      {data.map((item: Data, index: number) => (
        <div
          key={index}
          className={[
            styles.wrapper,
            data.length - 1 === index ? styles.last : '',
          ].join(' ')}
        >
          <p>
            <b>Username:</b> <i>{item.username}</i>
          </p>
          <p>
            <b>Age:</b> <i>{item.age}</i>
          </p>
          <p>
            <b>Email:</b> <i>{item.email}</i>
          </p>
          <p>
            <b>Password:</b> <i>{item.password}</i>
          </p>
          <p>
            <b>Confirm Password:</b> <i>{item.confirmPassword}</i>
          </p>
          <p>
            <b>Gender:</b> <i>{item.gender}</i>
          </p>
          <p>
            <b>Accept:</b> <i>{String(item.accept)}</i>
          </p>
          <p>
            <b>File:</b> <img src={item.file} alt="Image" />
          </p>
          <p>
            <b>Country:</b> <i>{item.country}</i>
          </p>
        </div>
      ))}
    </>
  );
});

Content.displayName = 'Content';
