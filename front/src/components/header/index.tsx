import { VscAccount } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from './style.module.scss';

interface IHeader {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  isMenu: () => void;
  name: string;
}

export const Header = ({ isMenu, name, children, className }: IHeader): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.container}>
        <div
          role="link"
          className={styles.title}
          onKeyDown={() => navigate('/')}
          onClick={() => navigate('/')}
          tabIndex={0}
        >
          История <span>отчётов</span>
        </div>
        <div role="button" onClick={isMenu} onKeyDown={isMenu} className={styles.menu} tabIndex={0}>
          <div className={styles.accountName}>{name}</div>
          <VscAccount size={28} className={styles.accountIcon} />
        </div>
      </div>
      {children}
    </header>
  );
};
