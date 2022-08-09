import { ClipLoader } from 'react-spinners';
import { Loader } from '../../const';
import styles from '../primary-loader/primary-loader.module.css';

export default function PrimaryLoader() {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader
        size={Loader.Primary.size}
        color={Loader.Primary.color}
      />
    </div>
  );
}
