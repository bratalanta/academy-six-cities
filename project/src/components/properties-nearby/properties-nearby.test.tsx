import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeProperty } from '../../mocks';
import PropertiesNearby from './properties-nearby';

const mockProperties = [makeFakeProperty()];
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: PropertiesNearby', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PropertiesNearby properties={mockProperties}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
