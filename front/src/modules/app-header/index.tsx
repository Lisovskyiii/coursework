import { ROUTES } from 'constants/RoutesConstants';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxTypedHook';
import { RootState } from 'store/store';

import { Header } from '../../components/header';
import { Menu } from '../../components/menu';

import styles from './style.module.scss';

export const AppHeader = (): JSX.Element | null => {
  const location = useLocation();
  const user = useAppSelector((state: RootState) => state.user);
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();

  const isMenu = (): void => {
    setActive(!active);
  };

  return location.pathname !== ROUTES.LOGIN ? (
    <Header className={styles.appHeader} isMenu={isMenu} name={user.username || 'Unknown'}>
      <Menu
        className={cn(styles.appMenu, { [styles.active]: active })}
        isMenu={isMenu}
        dispatch={dispatch}
      />
    </Header>
  ) : null;
};
