import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

export const Header: FC = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            isActive ? [styles.active, styles.link].join(' ') : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to={`/uncontrolled`}
          className={({ isActive }) =>
            isActive ? [styles.active, styles.link].join(' ') : styles.link
          }
        >
          Uncontrolled
        </NavLink>
        <NavLink
          to={`/react_hook_form`}
          className={({ isActive }) =>
            isActive ? [styles.active, styles.link].join(' ') : styles.link
          }
        >
          React Hook Form
        </NavLink>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
