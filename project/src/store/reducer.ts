import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortOption } from '../const';
import { Properties, PropertyCity } from '../types/property';
import { OptionValue } from '../types/sort';
import { loadProperties, loadReviews, setActiveSortOption, setCity, setProperties, setReviews } from './action';
import {Reviews} from '../types/review';

type InititalState = {
  city: PropertyCity;
  properties: Properties;
  activeSortOption: OptionValue;
  reviews: Reviews;
}

const initialState: InititalState = {
  city: DEFAULT_CITY,
  properties: [],
  activeSortOption: SortOption.POPULAR,
  reviews: []
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
    });
});
