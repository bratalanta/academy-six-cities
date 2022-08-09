import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Properties, Property } from '../types/property';
import { FormState } from '../types/property-form';
import { Reviews } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToPreviousRoute, redirectToRoute } from './actions';

export const fetchPropertiesAction = createAsyncThunk<Properties, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchProperties',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<Properties>(APIRoute.Properties);

    return data;
  }
);

export const fetchPropertyAction = createAsyncThunk<Property, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'room:id/fetchProperty',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Property>(`${APIRoute.Properties}/${id}`);

    return data;
  }
);

export const fetchPropertiesNearbyAction = createAsyncThunk<Properties, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'room:id/nearby/fetchPropertiesNearby',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Properties>(`${APIRoute.Properties}/${id}/nearby`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews | undefined, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (propertyId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${propertyId}`);

      return data;
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'Request failed with status code 400') {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  }
);

export const postReviewAction = createAsyncThunk<Reviews, FormState, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'room:id/comments/postReviewAction',
  async ({comment, rating, propertyId}, {dispatch, extra: api}) => {
    const {data} = await api.post(`${APIRoute.Reviews}/${propertyId}`, {comment, rating});

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToPreviousRoute());

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
  }
);
