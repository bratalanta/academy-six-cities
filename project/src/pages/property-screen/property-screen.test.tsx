import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, DEFAULT_CITY, LoadingStatus, NameSpace, SortOption } from '../../const';
import { makeFakeProperty, makeFakeReview, makeFakeUserData } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import PropertyScreen from './property-screen';

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

describe('Component: PropertyScreen', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PropertyScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('property-details')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('nearby')).toBeInTheDocument();
  });
});
