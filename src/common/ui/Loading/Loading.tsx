import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';
interface IProps {
  isSpin?: boolean;
  children?: ReactNode;
}
export const Loading: FC<IProps> = ({ isSpin = false, children }) => {
  return (
    <div className={styles.container}>
      {isSpin && (
        <div className={styles.wrapper}>
          <svg className={styles.progressCircle} width='74' height='74'>
            <circle className={styles.progressCircleBackground} cx='37' cy='37' r='31'></circle>
            <circle className={styles.progressCircleForeground} cx='37' cy='37' r='31'></circle>
          </svg>
        </div>
      )}
      <div className={styles.children}>{children}</div>
    </div>
  );
};
