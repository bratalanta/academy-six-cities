import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { makeFakeProperty, makeFakeReview } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import PropertyDetails from './property-details';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockProperty = makeFakeProperty();
const mockReview = makeFakeReview();

const storeAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview]
  }
});

const storeNoAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview]
  }
});

describe('Component: PropertyDetails', () => {

  it('should render correctly when not authorized', () => {
    render(
      <Provider store={storeNoAuth}>
        <MemoryRouter>
          <PropertyDetails property={mockProperty}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('gallery-img')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('good')[0]).toBeInTheDocument();
    expect(screen.queryByTestId(/To submit review please make sure to set/i)).not.toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <PropertyDetails property={mockProperty}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('gallery-img')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('good')[0]).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it('should change favorite status when user clicks on favorite button', async () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <PropertyDetails property={mockProperty}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByTestId('change-button')[0]);

    const [action] = storeAuth.getActions();

    expect(action.type).toBe('favorite/changeFavoriteStatus/pending');
  });
});
