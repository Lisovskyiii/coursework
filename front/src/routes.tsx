import { ROUTES } from 'constants/RoutesConstants';

import { LoginPage } from './pages/login-page';
import { MainPage } from './pages/main-page';
import { SingleReportPage } from './pages/single-report-page';

interface IRoutes {
  path: string;
  element: JSX.Element;
}

export const privateRoutes: IRoutes[] = [
  {
    path: ROUTES.HOME,
    element: <MainPage />
  },
  {
    path: ROUTES.REPORT,
    element: <SingleReportPage />
  }
];

export const publicRoutes: IRoutes[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />
  }
];
