import { LoadingStatus } from '../../const';
import { makeFakeProperty } from '../../mocks';
import { changeFavoritePropertyStatus } from '../../utils/utils';
import { changeFavoriteStatusAction, fetchPropertiesAction, fetchPropertiesNearbyAction, fetchPropertyAction } from '../api-actions';
import { PropertiesSlice, propertiesSlice } from './properties-slice';

const TEST_PROPERTIES_COUNT = 3;

const mockProperties = new Array(TEST_PROPERTIES_COUNT).fill(null)
  .map((_v, i) => ({...makeFakeProperty(), id: i}));
const mockProperty = makeFakeProperty();

describe('Reducer: propertiesSlice', () => {
  let state: PropertiesSlice;

  beforeEach(() => {
    state = {
      properties: [],
      propertiesNearby: [],
      propertiesLoadingStatus: LoadingStatus.Idle,
      propertyLoadingStatus: LoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(propertiesSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchPropertiesAction test', () => {
    it('should set properties with given properties and update propertiesLoadingStatus to "fulfilled" if fetchPropertiesAction is fulfilled',
      () => {
        expect(propertiesSlice.reducer(state,
          {payload: mockProperties, type: fetchPropertiesAction.fulfilled.type}))
          .toEqual({
            ...state,
            properties: mockProperties,
            propertiesLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('should update propertiesLoadingStatus to "pending" if fetchPropertiesAction is pending',
      () => {
        expect(propertiesSlice.reducer(state, {type: fetchPropertiesAction.pending.type}))
          .toEqual({
            ...state,
            propertiesLoadingStatus: LoadingStatus.Pending,
          });
      });

    it('should update propertiesLoadingStatus to "rejected" if fetchPropertiesAction is rejected',
      () => {
        expect(propertiesSlice.reducer(state, {type: fetchPropertiesAction.rejected.type}))
          .toEqual({
            ...state,
            propertiesLoadingStatus: LoadingStatus.Rejected,
          });
      });
  });

  describe('fetchPropertyAction test', () => {
    it('should set property with given property and update propertyLoadingStatus to "fulfilled" if fetchPropertyAction is fulfilled',
      () => {
        expect(propertiesSlice.reducer(state,
          {payload: mockProperty, type: fetchPropertyAction.fulfilled.type}))
          .toEqual({
            ...state,
            property: mockProperty,
            propertyLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('should update propertyLoadingStatus to "pending" and propertiesLoadingStatus to "idle" if fetchPropertyAction is pending',
      () => {
        expect(propertiesSlice.reducer(state, {type: fetchPropertyAction.pending.type}))
          .toEqual({
            ...state,
            propertyLoadingStatus: LoadingStatus.Pending,
          });
      });

    it('should update propertyLoadingStatus to "rejected" and propertiesLoadingStatus to "idle" if fetchPropertyAction is rejected',
      () => {
        expect(propertiesSlice.reducer(state, {type: fetchPropertyAction.rejected.type}))
          .toEqual({
            ...state,
            propertyLoadingStatus: LoadingStatus.Rejected,
          });
      });
  });

  describe('fetchPropertiesNearbyAction test', () => {
    it('should set propertiesNearby with given properties if fetchPropertiesNearbyAction is fulfilled',
      () => {
        expect(propertiesSlice.reducer(state, {payload: mockProperties, type: fetchPropertiesNearbyAction.fulfilled.type}))
          .toEqual({
            ...state,
            propertiesNearby: mockProperties,
          });
      });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should change favorite status of property in propertiesNearby, properties and property with given favorite status if changeFavoriteStatusAction is fulfilled',
      () => {
        const initState = {
          properties: mockProperties,
          propertiesNearby: mockProperties,
          propertiesLoadingStatus: LoadingStatus.Idle,
          propertyLoadingStatus: LoadingStatus.Idle,
          property: makeFakeProperty()
        };

        const changePropertiesNearby = initState.propertiesNearby
          .map((property) => changeFavoritePropertyStatus(property, mockProperty));

        const changeProperties = initState.properties
          .map((property) => changeFavoritePropertyStatus(property, mockProperty));

        const changeProperty = changeFavoritePropertyStatus(initState.property, mockProperty);

        expect(propertiesSlice.reducer(initState, {payload: mockProperty, type: changeFavoriteStatusAction.fulfilled.type}))
          .toEqual({
            ...state,
            propertiesNearby: changePropertiesNearby,
            properties: changeProperties,
            property: changeProperty
          });
      });
  });
});
