import { ILessonReport } from 'types/Report.interface';

import styles from './style.module.scss';

export const Card = (report: ILessonReport): JSX.Element => (
  <li className={styles.card}>
    <img
      className={styles.img}
      crossOrigin="anonymous"
      src={`${process.env.REACT_APP_PUBLIC_URL}/backend${report.groups[0].report.image_url}`}
      alt={report.title}
    />
    <div className={styles.descr}>
      <div className={styles.group}>{report.groups[0].title}</div>
      <div className={styles.subject}>{report.title}</div>
      <div className={styles.classes}>{report.room}</div>
      <div className={styles.place}>{report.address}</div>
      <div className={styles.time}>{`${report.time_start}-${report.time_end}`}</div>
      <div className={styles.date}>{report.date}</div>
    </div>
  </li>
);
