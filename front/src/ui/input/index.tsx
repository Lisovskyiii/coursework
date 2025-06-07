import cn from 'classnames';

import styles from './style.module.scss';

interface InputProps {
  name?: string;
  type: string;
  className?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const Input = ({
  name,
  className,
  type,
  value,
  autoComplete,
  onChange,
  ...props
}: InputProps): JSX.Element => (
  <input
    {...props}
    autoComplete={autoComplete}
    onChange={(e) => onChange?.(e)}
    value={value}
    className={cn(styles.input, className)}
    name={name}
    type={type}
  />
);
