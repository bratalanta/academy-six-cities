import { AppRoute, AuthorizationStatus } from '../../const';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
