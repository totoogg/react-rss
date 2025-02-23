import { FC, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PersonDetail } from '@/widgets';
import styles from './peoplePage.module.css';

export const PeoplePage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        const target = e.target as HTMLElement;
        if (
          target.className.includes('wrapper') ||
          target.className.includes('page')
        ) {
          navigate(`/?${searchParams.toString()}`);
        }
      }
    },
    [navigate, searchParams]
  );

  return (
    <div className={styles.page} onClick={handleClick}>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <PersonDetail />
        </div>
      </div>
    </div>
  );
};
