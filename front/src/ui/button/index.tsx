import classNames from 'classnames';

import styles from './style.module.scss';

interface IButtonProps {
  type: 'submit' | 'reset' | 'button';
  children?: string;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  type = 'button',
  children,
  className,
  disabled
}: IButtonProps): JSX.Element => (
  /* eslint-disable react/button-has-type */
  <button
    className={classNames(styles.btn, { [styles.submit]: type === 'submit' }, className)}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
  /* eslint-enable react/button-has-type */
);
