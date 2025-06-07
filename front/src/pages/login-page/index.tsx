import { Login } from '../../modules/login';

import styles from './style.module.scss';

export const LoginPage = () => (
  <div className={styles.overlay}>
    <Login />
  </div>
);
