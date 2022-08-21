import { LoadingStatus, REVIEWS_LIMIT } from '../../const';
import { makeFakeReview } from '../../mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { reviewsSlice, ReviewsSlice } from './reviews-slice';

const mockReviews = new Array(REVIEWS_LIMIT).fill(null)
  .map((_v, i) => ({...makeFakeReview(), id: i}));

describe('Reducer: reviewsSlice', () => {
  let state: ReviewsSlice;

  beforeEach(() => {
    state = {
      reviews: [],
      postingStatus: LoadingStatus.Idle
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchReviewsAction test', () => {
    it('should set reviews with given reviews if fetchReviewsAction is fulfilled',
      () => {
        expect(reviewsSlice.reducer(state, {payload: mockReviews, type: fetchReviewsAction.fulfilled.type}))
          .toEqual({
            ...state,
            reviews: mockReviews
          });
      });
  });

  describe('postReviewAction test', () => {
    it('should update postingStatus to "pending" if postReviewAction is pending', () => {
      expect(reviewsSlice.reducer(state, {type: postReviewAction.pending.type}))
        .toEqual({
          ...state,
          postingStatus: LoadingStatus.Pending
        });
    });

    it('should update postingStatus to "rejected" if postReviewAction is rejected', () => {
      expect(reviewsSlice.reducer(state, {type: postReviewAction.rejected.type}))
        .toEqual({
          ...state,
          postingStatus: LoadingStatus.Rejected
        });
    });

    it('should set reviews with given reviews and update postingStatus to "fulfilled" if postReviewAction is fulfilled', () => {
      expect(reviewsSlice.reducer(state, {payload: mockReviews, type: postReviewAction.fulfilled.type}))
        .toEqual({
          ...state,
          reviews: mockReviews,
          postingStatus: LoadingStatus.Fulfilled
        });
    });
  });
});
