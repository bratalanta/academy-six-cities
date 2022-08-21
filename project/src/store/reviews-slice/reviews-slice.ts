import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { Reviews } from '../../types/review';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

export type ReviewsSlice = {
  reviews: Reviews;
  postingStatus: LoadingStatus;
}

const initialState: ReviewsSlice = {
  reviews: [],
  postingStatus: LoadingStatus.Idle,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.postingStatus = LoadingStatus.Fulfilled;
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.postingStatus = LoadingStatus.Pending;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.postingStatus = LoadingStatus.Rejected;
      });
  }
});
