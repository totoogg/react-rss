import { FC, memo } from 'react';
import {
  clearChoosePeople,
  Download,
  Pagination,
  selectChoosePeople,
  selectLengthChoosePeople,
} from '@/features';
import {
  Button,
  ICharacter,
  useAppDispatch,
  useAppSelector,
  useSearchPeople,
} from '@/shared';
import { IMainProps } from '../model/mainType';
import styles from './main.module.css';

export const Main: FC<IMainProps> = memo(({ children }) => {
  const { count, people } = useSearchPeople();
  const lengthChoosePeople = useAppSelector((state) =>
    selectLengthChoosePeople(state)
  );
  const dispatch = useAppDispatch();
  const choosePeople = useAppSelector((state) => selectChoosePeople(state));
  const select = lengthChoosePeople > 1 ? 'people' : 'person';

  return (
    <div className={styles.main}>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
      <div className={styles.gallery}>
        {people.length > 0 ? (
          children
        ) : (
          <div className={styles.notFound}>
            No characters with the name &quot;
            {localStorage.getItem('search')}
            &quot; found
          </div>
        )}
      </div>
      {lengthChoosePeople > 0 ? (
        <div className={styles.choose}>
          <span>
            <b>{lengthChoosePeople}</b> {select} are selected
          </span>
          <div className={styles['chose-buttons']}>
            <Button
              onClick={() => dispatch(clearChoosePeople())}
              className={[styles.button]}
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
    </div>
  );
});

Main.displayName = 'Main';
