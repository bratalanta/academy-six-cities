import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    render(<ErrorMessage />);

    expect(screen.getByText('Sorry, failed to load!')).toBeInTheDocument();
  });
});
