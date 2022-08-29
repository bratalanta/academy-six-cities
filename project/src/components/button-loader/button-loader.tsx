import { BeatLoader } from 'react-spinners';
import { Loader } from '../../const';

export default function ButtonLoader() {
  return (
    <BeatLoader
      size={Loader.Button.size}
      color={Loader.Button.color}
      data-testid={'button-loader'}
    />
  );
}
