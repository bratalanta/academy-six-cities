import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import browserHistory from '../browser-history';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { ChangeFavoriteStatusPayload } from '../types/favorites-data';
import { Properties, Property } from '../types/property';
import { PostReviewPayload } from '../types/property-form';
import { Reviews } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './actions';
import { handleError } from './handle-error';

const WarnMessage = {
  PropertiesNearby: 'Sorry, failed to load properties nearby',
  Reviews: 'Sorry, failed to load reviews',
  Login: 'Unable to login. Try again later',
  Logout: 'Unable to logout. Try again later'
};

export const fetchPropertiesAction = createAsyncThunk<Properties, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'hotels/fetchProperties',
  async (_, {extra: api}) => {
    const {data} = await api.get<Properties>(APIRoute.Properties);

    return data;
  }
);

export const fetchPropertyAction = createAsyncThunk<Property, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'hotels/fetchProperty',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Property>(`${APIRoute.Properties}/${id}`);
      dispatch(fetchPropertiesNearbyAction(+id));
      dispatch(fetchReviewsAction(+id));

      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === StatusCodes.NOT_FOUND) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }

      throw err;
    }
  }
);

export const fetchPropertiesNearbyAction = createAsyncThunk<Properties, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'hotels/fetchPropertiesNearby',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<Properties>(`${APIRoute.Properties}/${id}/nearby`);

      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === StatusCodes.NOT_FOUND) {
          toast.warn(WarnMessage.PropertiesNearby);
        } else {
          handleError(err);
        }
      }

      throw err;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<Properties, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/fetchFavorites',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<Properties>(APIRoute.Favorites);

    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<Property, ChangeFavoriteStatusPayload, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/changeFavoriteStatus',
  async ({status, propertyId}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Property>(`${APIRoute.Favorites}/${propertyId}/${status}`);

      return data;
    } catch(err) {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(redirectToRoute(AppRoute.Login));
        handleError(err);
      }

      throw err;
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comments/fetchReviews',
  async (propertyId, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${propertyId}`);

      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === StatusCodes.NOT_FOUND) {
          toast.warn(WarnMessage.Reviews);
        } else {
          handleError(err);
        }
      }

      throw err;
    }
  }
);

export const postReviewAction = createAsyncThunk<Reviews, PostReviewPayload, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comments/postReview',
  async ({comment, rating, propertyId}, {extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${propertyId}`, {comment, rating});

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

    if (data) {
      dispatch(fetchFavoritesAction());
    }

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
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      browserHistory.back();
      dispatch(fetchPropertiesAction());
      dispatch(fetchFavoritesAction());

      return data;
    } catch(err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === StatusCodes.NOT_FOUND) {
          toast.warn(WarnMessage.Login);
        } else {
          handleError(err);
        }
      }

      throw err;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(fetchPropertiesAction());
    } catch(err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === StatusCodes.NOT_FOUND) {
          toast.warn(WarnMessage.Logout);
        } else {
          handleError(err);
        }
      }

      throw err;
    }
  }
);
