import { createAction } from '@reduxjs/toolkit';
import { Properties, PropertyCity } from '../types/property';

export const setCity = createAction<PropertyCity>('main/changeCity');
export const setProperties = createAction<Properties>('main/fillProperties');
