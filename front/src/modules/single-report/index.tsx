import { useEffect, useState } from 'react';
import { useHttp } from 'hooks/useHttp';
import { IStudentsReport } from 'types/Report.interface';
import Spinner from 'ui/spinner';

import { ReportStudents } from '../../components/report-students';

import styles from './style.module.scss';

interface ISingleReport {
  id: string;
}

export const SingleReport = ({ id }: ISingleReport): JSX.Element => {
  const { request } = useHttp();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<IStudentsReport | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const response: IStudentsReport = await request({
          url: `${process.env.REACT_APP_PUBLIC_URL}/report/${id}`,
          withCredentials: true
        });

        setStudents(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch report:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [id]);
  /* eslint-disable react-hooks/exhaustive-deps */

  if (isLoading) {
    return <Spinner />;
  }

  return students ? (
    <ReportStudents
      className={styles.singleReport}
      students={students.students}
      thumbnail={students.image_url}
    />
  ) : (
    <div>Что-то пошло не так</div>
  );
};
