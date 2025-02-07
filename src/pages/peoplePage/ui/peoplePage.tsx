import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './peoplePage.module.css';

export const PeoplePage: FC = () => {
  const { personId } = useParams();

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <h1>Person {personId}</h1>
        </div>
      </div>
    </div>
  );
};
