import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';
import ReviewsList from './reviews-list';
import { makeFakeReview } from '../../mocks';

const mockStore = configureMockStore();
const mockReviews = [makeFakeReview(), makeFakeReview()];
const store = mockStore({
  [NameSpace.Reviews]: {
    reviews: mockReviews
  }
});

describe('Component: ReviewsList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(mockReviews.length);
    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
  });
});
