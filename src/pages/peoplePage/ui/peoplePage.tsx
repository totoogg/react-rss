import { FC, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { PersonDetail } from '@/widgets';
import styles from './peoplePage.module.css';
import { addLoader, useAppDispatch } from '@/shared';

export const PeoplePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        const target = e.target as HTMLElement;
        if (
          target.className.includes &&
          (target.className.includes('wrapper') ||
            target.className.includes('page'))
        ) {
          dispatch(addLoader());
          navigate(`/?${searchParams.toString()}`);
        }
      }
    },
    [dispatch, navigate, searchParams]
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
