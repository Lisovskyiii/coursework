import { ROUTES } from 'constants/RoutesConstants';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxTypedHook';
import { ILessonReport } from 'types/Report.interface';
import { Input } from 'ui/input';
import { formatDateToDMY } from 'utils/Time.utils';

import empty from '../../assets/empty.png';
import { Card } from '../../components/card';
import { fetchReports, selectAll } from '../../store/slices/card-list-slices';
import { store } from '../../store/store';
import Spinner from '../../ui/spinner';

import styles from './style.module.scss';

interface ICardListProps {
  className?: string;
  startDate: string;
  endDate: string;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
}

export const CardList = ({
  className,
  startDate,
  endDate,
  onChangeEndDate,
  onChangeStartDate
}: ICardListProps): JSX.Element => {
  const reports = selectAll(store.getState());
  const reportsLoadingStatus = useAppSelector((state) => state.reports.reportsLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(
        fetchReports({ dateStart: formatDateToDMY(startDate), dateEnd: formatDateToDMY(endDate) })
      );
    }, // eslint-disable-next-line
    [startDate, endDate]
  );

  if (reportsLoadingStatus === 'loading') {
    return <Spinner />;
  }
  if (reportsLoadingStatus === 'error') {
    return (
      <div className={cn(styles.error, className)}>
        <img src={empty} alt="error" />
        <h5>Что-то пошло не так :&#40;</h5>
      </div>
    );
  }

  const renderReportsList = (reports: ILessonReport[]): JSX.Element[] | JSX.Element => {
    if (reports.length === 0) {
      return (
        <div className={cn(styles.empty)}>
          <img src={empty} style={{ height: '100px' }} alt="empty" />
          <h5 className={styles.warning}>Нету отчётов в данный промежуток</h5>
        </div>
      );
    }

    return reports.map((props) => (
      <Link
        key={props.groups[0].report.id}
        to={ROUTES.REPORT.replace(':id', props.groups[0].report.id.toString())}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card {...props} />
      </Link>
    ));
  };

  const elements = renderReportsList(reports);

  return (
    <div className={className}>
      <div className={styles.filters}>
        <Input
          defaultValue={startDate}
          type="date"
          onChange={(value) => onChangeStartDate(value.currentTarget.value)}
        />

        <Input
          defaultValue={endDate}
          type="date"
          onChange={(value) => onChangeEndDate(value.currentTarget.value)}
        />
      </div>

      <div>
        {Array.isArray(elements) ? <ul className={cn(styles.wrapper)}>{elements}</ul> : elements}
      </div>
    </div>
  );
};
