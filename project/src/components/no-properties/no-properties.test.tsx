import {render, screen} from '@testing-library/react';
import NoProperties from './no-properties';

describe('Component: NoFavorites', () => {
  it('should render correctly', () => {
    render(<NoProperties />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
