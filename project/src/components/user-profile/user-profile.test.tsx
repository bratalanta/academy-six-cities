import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeProperty, makeFakeUserData } from '../../mocks';
import UserProfile from './user-profile';

const mockStore = configureMockStore();
const mockUserData = makeFakeUserData();

const storeAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserData,
  },
  [NameSpace.Favorites]: {favorites: [makeFakeProperty(), makeFakeProperty()]},
});

const storeNoAuth = mockStore({
  [NameSpace.Favorites]: {favorites: [makeFakeProperty(), makeFakeProperty()]},
  [NameSpace.Auth]: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: UserProfile', () => {
  it('should render correctly when authorized', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
  });


  it('should render correctly when not authorized', () => {
    render(
      <Provider store={storeNoAuth}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.queryByText(mockUserData.email)).not.toBeInTheDocument();
  });
});
