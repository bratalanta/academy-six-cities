import { AppRoute, AuthorizationStatus } from '../../const';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/auth-slice/selectors';

type PrivateRouteProps = {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
