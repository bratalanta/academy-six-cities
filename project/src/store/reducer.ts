import { createReducer } from '@reduxjs/toolkit';
import { properties } from '../mocks/properties';
import { Properties, PropertyCity } from '../types/property';
import { setCity, setProperties } from './action';

type InititalState = {
  city: PropertyCity
  properties: Properties;
}

const initialState: InititalState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 10
    }},
  properties
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProperties, (state, {payload}) => {
      state.properties = payload.properties;
    })
    .addCase(setCity, (state, {payload}) => {
      state.city = payload.city;
    });
});
