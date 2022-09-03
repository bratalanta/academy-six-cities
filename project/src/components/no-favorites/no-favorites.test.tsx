import {render, screen} from '@testing-library/react';
import NoFavorites from './no-favorites';

describe('Component: NoFavorites', () => {
  it('should render correctly', () => {
    render(<NoFavorites />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
