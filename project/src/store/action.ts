import { createAction } from '@reduxjs/toolkit';
import { Properties, PropertyCity } from '../types/property';
import { OptionValue } from '../types/sort';

export const setCity = createAction<PropertyCity>('main/setCity');
export const setProperties = createAction<Properties>('main/setProperties');
export const setActiveSortOption = createAction<OptionValue>('main/setActiveSortOption');
