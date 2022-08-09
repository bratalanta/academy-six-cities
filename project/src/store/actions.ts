import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirectToRoute = createAction<AppRoute | number>('common/redirectToRoute');
export const redirectToPreviousRoute = createAction('common/redirectToPreviousRoute');
