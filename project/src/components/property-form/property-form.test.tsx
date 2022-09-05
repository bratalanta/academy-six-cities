import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoadingStatus, NameSpace, RATINGS } from '../../const';
import userEvent from '@testing-library/user-event';
import { makeFakeReview } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import PropertyForm from './property-form';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockReviews = [makeFakeReview()];

const storeIdle = mockStore({
  [NameSpace.Reviews]: {
    reviews: mockReviews,
    postingStatus: LoadingStatus.Idle
  }
});

const storePending = mockStore({
  [NameSpace.Reviews]: {
    reviews: mockReviews,
    postingStatus: LoadingStatus.Pending
  }
});

describe('Component: PropertyForm', () => {

  it('should render correctly', () => {
    render(
      <Provider store={storeIdle}>
        <MemoryRouter>
          <PropertyForm propertyId={5} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('property-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('input').length).toEqual(RATINGS.length);
  });

  it('should show loading', () => {
    render(
      <Provider store={storePending}>
        <MemoryRouter>
          <PropertyForm propertyId={5} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });

  it('should invoke postReview/pending action', async () => {
    render(
      <Provider store={storeIdle}>
        <MemoryRouter>
          <PropertyForm propertyId={5} />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Tell how was your stay/i),
      'Bail the boat, to stop it from sinking. Add the store account to the last cent.');
    await userEvent.click(screen.getAllByTestId('input')[3]);
    await userEvent.click(screen.getByRole('button'));

    const [action] = storeIdle.getActions();

    expect(action.type).toEqual('comments/postReview/pending');
  });
});
