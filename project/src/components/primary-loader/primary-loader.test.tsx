import {render, screen} from '@testing-library/react';
import PrimaryLoader from './primary-loader';

describe('Component: PrimaryLoader', () => {
  it('should render correctly', () => {
    render(<PrimaryLoader />);

    expect(screen.getByTestId('primary-loader')).toBeInTheDocument();
  });
});
