import cn from 'classnames';

import img from '../../assets/icons/add-btn.svg';

import styles from './style.module.scss';

interface IAddReportParams {
  className?: string;
  onAddReport: () => void;
}

export const AddReport = ({ className, onAddReport }: IAddReportParams): JSX.Element => (
  <div
    role="button"
    className={cn(styles.btn, className)}
    onKeyDown={onAddReport}
    tabIndex={0}
    onClick={onAddReport}
  >
    <img src={img} alt="add-button" />
    <h3 className={styles.title}>Добавить отчёт</h3>
  </div>
);
