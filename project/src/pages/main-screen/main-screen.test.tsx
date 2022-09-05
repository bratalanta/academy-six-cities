import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, DEFAULT_CITY, LoadingStatus, NameSpace, SortOption } from '../../const';
import { makeFakeProperty, makeFakeReview, makeFakeUserData } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import MainScreen from './main-screen';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockUserInfo = makeFakeUserData();
const mockProperty = {...makeFakeProperty(), city: DEFAULT_CITY};
const mockReview = makeFakeReview();

const store = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserInfo,
    loginStatus: LoadingStatus.Fulfilled,
    logoutStatus: LoadingStatus.Idle
  },
  [NameSpace.Favorites]: {
    favorites: [mockProperty]
  },
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  },
  [NameSpace.Properties]: {
    properties: [mockProperty],
    propertiesNearby: [mockProperty],
    propertiesLoadingStatus: LoadingStatus.Fulfilled,
    propertyLoadingStatus: LoadingStatus.Fulfilled,
    property: mockProperty
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview],
    postingStatus: LoadingStatus.Idle,
  }
});

const storeNoProperties = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserInfo,
    loginStatus: LoadingStatus.Fulfilled,
    logoutStatus: LoadingStatus.Idle
  },
  [NameSpace.Favorites]: {
    favorites: [mockProperty]
  },
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  },
  [NameSpace.Properties]: {
    properties: [],
    propertiesNearby: [mockProperty],
    propertiesLoadingStatus: LoadingStatus.Fulfilled,
    propertyLoadingStatus: LoadingStatus.Fulfilled,
    property: mockProperty
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview],
    postingStatus: LoadingStatus.Idle,
  }
});

describe('Component: MainScreen', () => {

  it('should render correctly when propeties available', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('properties-available')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render correctly when propeties are not available', () => {
    render(
      <Provider store={storeNoProperties}>
        <MemoryRouter>
          <MainScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.queryByTestId('properties-available')).not.toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
