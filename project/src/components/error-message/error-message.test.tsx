import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: ButtonLoader', () => {
  it('should render correctly', () => {
    render(<ErrorMessage />);

    expect(screen.getByText('Sorry, failed to load!')).toBeInTheDocument();
  });
});
