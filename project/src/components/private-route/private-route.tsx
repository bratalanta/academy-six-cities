import { AppRoute } from '../../const';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { authSelector } from '../../store/auth-slice/selectors';
import PrimaryLoader from '../primary-loader/primary-loader';

type PrivateRouteProps = {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const {
    isUserAuthorized,
    isUserUnknown
  } = useAppSelector(authSelector);

  if (isUserUnknown) {
    return <PrimaryLoader />;
  }

  return (
    isUserAuthorized
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
