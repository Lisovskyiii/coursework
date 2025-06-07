import cn from 'classnames';

import styles from './style.module.scss';

interface IModalProps {
  className?: string;
  children?: JSX.Element[] | JSX.Element;
  type: 'report' | 'addForm' | 'loginForm';
}

export const Modal = ({ className, children, type }: IModalProps): JSX.Element => {
  let extraClass;

  switch (type) {
    case 'report':
      extraClass = styles.report;
      break;
    case 'addForm':
      extraClass = styles.addForm;
      break;
    case 'loginForm':
      extraClass = styles.loginForm;
      break;
    default:
      extraClass = null;
  }

  return <div className={cn(styles.modal, className, extraClass)}>{children}</div>;
};
