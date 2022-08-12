import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appSlice } from './app-slice/app-slice';
import { authSlice } from './auth-slice/auth-slice';
import { propertiesSlice } from './properties-slice/properties-slice';
import { reviewsSlice } from './reviews-slice/reviews-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Properties]: propertiesSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
});
