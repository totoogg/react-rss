import { FC, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Detail } from '@/entities';
import styles from './peoplePage.module.css';

export const PeoplePage: FC = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        const target = e.target as HTMLElement;
        if (
          target.className.includes('wrapper') ||
          target.className.includes('page')
        ) {
          navigate(`/${location.search}`);
        }
      }
    },
    [location.search, navigate]
  );

  return (
    <div className={styles.page} onClick={handleClick}>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <Detail id={personId || ''} />
        </div>
      </div>
    </div>
  );
};
