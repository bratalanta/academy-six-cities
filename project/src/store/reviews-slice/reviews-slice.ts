import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { Reviews } from '../../types/review';
import { fetchReviewsAction } from '../api-actions';

type ReviewsSlice = {
  reviews: Reviews;
  loadingStatus: LoadingStatus;
}

const initialState: ReviewsSlice = {
  reviews: [],
  loadingStatus: LoadingStatus.Idle
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
      .addCase(fetchReviewsAction.pending, (state) => {
        state.loadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
      });
  }
});
