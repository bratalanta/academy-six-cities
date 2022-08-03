import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Properties, PropertyCity } from '../types/property';
import { Reviews } from '../types/review';
import { OptionValue } from '../types/sort';
import { UserData } from '../types/user-data';

export const setCity = createAction<PropertyCity>('main/setCity');
export const setActiveSortOption = createAction<OptionValue>('main/setActiveSortOption');
export const loadProperties = createAction('data/loadProperties');
export const loadPropertiesResolved = createAction<Properties>('data/loadPropertiesResolved');
export const loadPropertiesRejected = createAction('data/loadPropertiesRejected');
export const loadReviews = createAction<Reviews>('data/loadReviews');
export const requireAuthorization = createAction<AuthorizationStatus>('login/requireAuthorization');
export const setUserInfo = createAction<UserData | null>('data/setUserInfo');
export const setError = createAction<string | null>('common/setError');
export const redirectToRoute = createAction<AppRoute>('common/redirectToRoute');
