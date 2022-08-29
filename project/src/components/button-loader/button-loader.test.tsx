import {render, screen} from '@testing-library/react';
import ButtonLoader from './button-loader';

describe('Component: ButtonLoader', () => {
  it('should render correctly', () => {
    render(<ButtonLoader />);

    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });
});
