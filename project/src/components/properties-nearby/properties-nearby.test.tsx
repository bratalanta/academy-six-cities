import {render, screen} from '@testing-library/react';
import { makeFakeProperty } from '../../mocks';
import PropertiesNearby from './properties-nearby';

const mockProperties = [makeFakeProperty()];

describe('Component: ButtonLoader', () => {
  it('should render correctly', () => {
    render(<PropertiesNearby properties={mockProperties}/>);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
