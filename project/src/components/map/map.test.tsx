import {render, screen} from '@testing-library/react';
import { DEFAULT_CITY, MapContainerClassName } from '../../const';
import { makeFakeProperty } from '../../mocks';
import Map from './map';

const mockProperties = [makeFakeProperty()];

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        currentCity={DEFAULT_CITY}
        properties={mockProperties}
        containerClassName={MapContainerClassName.City}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
