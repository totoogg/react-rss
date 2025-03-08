import { FC, memo } from 'react';
import {
  clearChoosePeople,
  Download,
  Pagination,
  selectChoosePeople,
  selectLengthChoosePeople,
} from '@/features';
import { Button, ICharacter, useAppDispatch, useAppSelector } from '@/shared';
import { IMainProps } from '../model/mainType';
import styles from './main.module.css';
import { useSearchParams } from 'react-router';

export const Main: FC<IMainProps> = memo(({ children, count }) => {
  const [query] = useSearchParams();
  const search = query.get('search');

  const lengthChoosePeople = useAppSelector((state) =>
    selectLengthChoosePeople(state)
  );
  const dispatch = useAppDispatch();
  const choosePeople = useAppSelector((state) => selectChoosePeople(state));
  const select = lengthChoosePeople > 1 ? 'people' : 'person';

  return (
    <div className={styles.main}>
      {lengthChoosePeople > 0 ? (
        <div className={styles.choose}>
          <span>
            <b>{lengthChoosePeople}</b> {select} selected
          </span>
          <div className={styles['chose-buttons']}>
            <Button
              onClick={() => dispatch(clearChoosePeople())}
              className={styles.button}
              classNameButton="flat"
            >
              Unselect all
            </Button>
            <Download
              className={styles.button}
              data={choosePeople as { [key: string]: ICharacter }}
              fileName={`${lengthChoosePeople}_${select}.csv`}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
      <div className={styles.gallery}>
        {count > 0 ? (
          children
        ) : (
          <div className={styles.notFound}>
            No characters with the name &quot;
            {search || ''}
            &quot; found
          </div>
        )}
      </div>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
    </div>
  );
});

Main.displayName = 'Main';
