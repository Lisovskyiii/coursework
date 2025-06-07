import cn from 'classnames';
import { IStudent } from 'types/Report.interface';

import { Modal } from '../../ui/modal';

import styles from './style.module.scss';

interface IReportStusentsParams {
  className?: string;
  students: IStudent[];
  thumbnail: string;
}

export const ReportStudents = ({
  className,
  students,
  thumbnail
}: IReportStusentsParams): JSX.Element => {
  const elements = students.map((student, i) => {
    const studentInfo = `${i + 1}. ${student.name}`;

    return (
      <li className={cn(styles.li, { [styles.false]: !student.detected })} key={student.id}>
        <div className={styles.name}>{studentInfo}</div>
        <div className={styles.detected}>{student.detected ? 'присутсвует' : 'отсутсвует'}</div>
      </li>
    );
  });

  return (
    <div className={cn(styles.singleReport, className)}>
      <img
        src={`${process.env.REACT_APP_PUBLIC_URL}/backend/${thumbnail}`}
        alt="students"
        className={styles.image}
      />
      <Modal type="report">
        <ul className={styles.ul}>{elements}</ul>
      </Modal>
    </div>
  );
};
