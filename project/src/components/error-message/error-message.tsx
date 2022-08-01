import styles from '../error-message/error-message.module.css';

export default function ErrorMessage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.text}>Sorry, failed to load!</span>
        <button
          type="button"
          className={`button ${styles.errorButton}`}
          onClick={() => window.location.reload()}
        >Try again
        </button>
      </div>
    </div>
  );
}
