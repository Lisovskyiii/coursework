import { useParams } from 'react-router-dom';

import error from '../../assets/error.gif';
import { SingleReport } from '../../modules/single-report';

interface IUserParams extends Record<string, string | undefined> {
  id: string | undefined;
}

export const SingleReportPage = (): JSX.Element => {
  const { id } = useParams<IUserParams>();

  return id ? <SingleReport id={id} /> : <img src={error} alt="empty" />;
};
