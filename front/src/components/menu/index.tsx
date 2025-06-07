import { ROUTES } from 'constants/RoutesConstants';

import { useNavigate } from 'react-router-dom';
import { logout } from 'api/Auth.api';
import cn from 'classnames';
import { useAppDispatch } from 'hooks/useReduxTypedHook';

import close from '../../assets/icons/close.svg';
import { removeUser } from '../../store/slices/user-slices';

import styles from './style.module.scss';

interface IMenuProps {
  className?: string;
  isMenu: () => void;
  dispatch: ReturnType<typeof useAppDispatch>;
}

export const Menu = ({ className, isMenu, dispatch }: IMenuProps): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(removeUser());
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={cn(styles.menu, className)}>
      <div role="button" tabIndex={0} onKeyDown={isMenu} className={styles.close} onClick={isMenu}>
        <img src={close} alt="close" />
      </div>
      <nav>
        <ul className={styles.list}>
          <li className={cn(styles.link, styles.help)}>
            <a href="mailto:lisovskij_ka_21@grsu.by">Поддержка</a>
          </li>
          <li className={cn(styles.link, styles.settings)}>
            <a href="#">Настройки</a>
          </li>
          <li className={cn(styles.link, styles.exit)}>
            <span
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLogout();
                }
              }}
              onClick={handleLogout}
            >
              Выйти
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
