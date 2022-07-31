import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Properties, PropertyCity } from '../types/property';
import { Reviews } from '../types/review';
import { OptionValue } from '../types/sort';

export const setCity = createAction<PropertyCity>('main/setCity');
export const setProperties = createAction<Properties>('main/setProperties');
export const setActiveSortOption = createAction<OptionValue>('main/setActiveSortOption');
export const setReviews = createAction<Reviews>('room/setReviews');
export const loadProperties = createAction<Properties>('data/loadProperties');
export const loadReviews = createAction<Reviews>('data/loadReviews');
export const requireAuthorization = createAction<AuthorizationStatus>('login/requireAuthorization');
