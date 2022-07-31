import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortOption, AuthorizationStatus } from '../const';
import { Properties, PropertyCity } from '../types/property';
import { OptionValue } from '../types/sort';
import { loadProperties, loadReviews, requireAuthorization, setActiveSortOption, setCity, setError, setProperties, setReviews, setUserInfo } from './actions';
import {Reviews} from '../types/review';
import { UserData } from '../types/user-data';

type InititalState = {
  city: PropertyCity;
  properties: Properties;
  activeSortOption: OptionValue;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  error: string | null;
}

const initialState: InititalState = {
  city: DEFAULT_CITY,
  properties: [],
  activeSortOption: SortOption.POPULAR,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  error: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProperties, (state, action) => {
      state.properties = action.payload;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSortOption, (state, action) => {
      state.activeSortOption = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadProperties, (state, action) => {
      state.properties = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
