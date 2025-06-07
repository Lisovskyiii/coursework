import { validateSchemaLoginForm } from 'utils/ValidateForm';

import { LoginForm } from '../../components/login-form';

import styles from './style.module.scss';

export const Login = (): JSX.Element => (
  <LoginForm className={styles.login} validateSchema={validateSchemaLoginForm} />
);
