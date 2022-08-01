import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortOption, AuthorizationStatus, PropertiesLoadingStatus } from '../const';
import { Properties, PropertyCity } from '../types/property';
import { OptionValue } from '../types/sort';
import { loadProperties, loadPropertiesRejected, loadPropertiesResolved, loadReviews, requireAuthorization, setActiveSortOption, setCity, setUserInfo } from './actions';
import {Reviews} from '../types/review';
import { UserData } from '../types/user-data';

type InititalState = {
  city: PropertyCity;
  properties: Properties;
  activeSortOption: OptionValue;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  propertiesLoadingStatus: PropertiesLoadingStatus;
}

const initialState: InititalState = {
  city: DEFAULT_CITY,
  properties: [],
  activeSortOption: SortOption.POPULAR,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  propertiesLoadingStatus: PropertiesLoadingStatus.Idle
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSortOption, (state, action) => {
      state.activeSortOption = action.payload;
    })
    .addCase(loadProperties, (state) => {
      state.propertiesLoadingStatus = PropertiesLoadingStatus.Pending;
    })
    .addCase(loadPropertiesResolved, (state, action) => {
      state.properties = action.payload;
      state.propertiesLoadingStatus = PropertiesLoadingStatus.Resolved;
    })
    .addCase(loadPropertiesRejected, (state) => {
      state.propertiesLoadingStatus = PropertiesLoadingStatus.Rejected;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
