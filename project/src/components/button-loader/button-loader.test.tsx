import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import ButtonLoader from './button-loader';

const mockStore = configureMockStore();
const store = mockStore();

describe('Component: ButtonLoader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ButtonLoader />
      </Provider>
    );

    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });
});
