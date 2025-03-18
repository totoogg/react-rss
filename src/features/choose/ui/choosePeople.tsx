import { FC } from 'react';
import { Choose, useAppDispatch, useAppSelector } from '@/shared';
import { selectIsChoosePeople } from '../model/selectors';
import { choosePeople } from '../model/choosePeopleSlice';
import { IChoosePeopleProps } from '../model/choosePeopleTypes';

export const ChoosePeople: FC<IChoosePeopleProps> = ({
  birth_year,
  films,
  name,
  url,
  className,
}) => {
  const isChecked = useAppSelector((state) =>
    selectIsChoosePeople(state, name)
  );
  const dispatch = useAppDispatch();

  return (
    <Choose
      className={className}
      id={name}
      onChoose={() =>
        dispatch(
          choosePeople({
            birth_year,
            films,
            name,
            url,
          })
        )
      }
      isChecked={isChecked}
    />
  );
};

ChoosePeople.displayName = 'ChoosePeople';
