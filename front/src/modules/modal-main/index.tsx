import { useEffect, useState } from 'react';
import { getSchedule } from 'api/Grsu.api';
import cn from 'classnames';
import { useAppSelector } from 'hooks/useReduxTypedHook';
import { RootState } from 'store/store';
import { IScheduleResponse } from 'types/Schedule.inerface';
import { toFormatDate } from 'utils/Time.utils';
import { validateSchemaReportForm } from 'utils/ValidateForm';

import { ReportForm } from '../../components/report-form';

import styles from './style.module.scss';

interface IModalProps {
  onCloseModal: () => void;
  className?: string;
  onChangeStartDate: (date: string) => void;
  activeModal?: boolean;
}

export const ModalMain = ({
  onCloseModal,
  className,
  activeModal,
  onChangeStartDate
}: IModalProps): JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [response, setResponse] = useState<IScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      if (activeModal && user.schedule_id) {
        try {
          setIsLoading(true);
          const response: IScheduleResponse = await getSchedule({
            dateStart: toFormatDate(date),
            dateEnd: toFormatDate(date)
          });

          setResponse(response);
        } catch (err) {
          console.error('Failed to fetch schedule:', err);
          setDate(date);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTeacherSchedule();
  }, [activeModal, date, user.schedule_id]);

  const handleChangeDate = (dateValue: string) => {
    setDate(new Date(dateValue));
  };

  return (
    <div className={cn(styles.overlay, className)}>
      <ReportForm
        onChangeStartDate={onChangeStartDate}
        isLoading={isLoading}
        date={date}
        handleChangeDate={handleChangeDate}
        schedule={response}
        className={styles.reportForm}
        onCloseModal={onCloseModal}
        validateSchema={validateSchemaReportForm}
      />
    </div>
  );
};
