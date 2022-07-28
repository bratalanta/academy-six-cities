import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortOption } from '../const';
import { properties } from '../mocks/properties';
import { Properties, PropertyCity } from '../types/property';
import { OptionValue } from '../types/sort';
import { setActiveSortOption, setCity, setProperties } from './action';

type InititalState = {
  city: PropertyCity;
  properties: Properties;
  activeSortOption: OptionValue;
}

const initialState: InititalState = {
  city: DEFAULT_CITY,
  properties,
  activeSortOption: SortOption.POPULAR
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
    });
});
