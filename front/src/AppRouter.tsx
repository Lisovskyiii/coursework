import { ROUTES } from 'constants/RoutesConstants';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { me } from 'api/Auth.api';
import { useAppDispatch } from 'hooks/useReduxTypedHook';
import { setUser } from 'store/slices/user-slices';
import Spinner from 'ui/spinner';

import { useAuth } from './hooks/useAuth';
import { privateRoutes, publicRoutes } from './routes';

export const AppRouter = (): JSX.Element => {
  const location = useLocation();
  const { isAuth, isLoading } = useAuth(location.pathname);

  // console.log(location);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (isAuth) {
        me().then((data) => {
          dispatch(setUser(data));
          navigate(ROUTES.HOME);
        });
      } else {
        navigate(ROUTES.LOGIN);
      }
    }, // eslint-disable-next-line
    [isAuth]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
