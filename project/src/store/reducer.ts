import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { properties } from '../mocks/properties';
import { Properties, PropertyCity } from '../types/property';
import { setCity, setProperties } from './action';

type InititalState = {
  city: PropertyCity;
  properties: Properties;
}

const initialState: InititalState = {
  city: DEFAULT_CITY,
  properties
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProperties, (state, action) => {
      state.properties = action.payload;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});
