import styles from './styles.module.scss';
export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.progressCircle} width='74' height='74'>
        <circle className={styles.progressCircleBackground} cx='37' cy='37' r='31'></circle>
        <circle className={styles.progressCircleForeground} cx='37' cy='37' r='31'></circle>
      </svg>
    </div>
  );
};
2;
