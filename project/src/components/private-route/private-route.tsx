import { AppRoute } from '../../const';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { authSelector } from '../../store/auth-slice/selectors';

type PrivateRouteProps = {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const {isUserAuthorized} = useAppSelector(authSelector);

  return (
    isUserAuthorized
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
