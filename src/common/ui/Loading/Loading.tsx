import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface IProps {
  isSpin?: boolean;
  children?: ReactNode;
}

export const Loading: FC<IProps> = ({ isSpin = false, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spinnerSize, setSpinnerSize] = useState(74);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth } = containerRef.current;
        const newSize = offsetWidth >= 400 ? 74 : 40;
        setSpinnerSize(newSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {isSpin && (
        <div className={styles.wrapper}>
          <div className={styles.progressCircle} style={{ width: spinnerSize, height: spinnerSize }}>
            <svg viewBox='0 0 74 74'>
              <circle className={styles.progressCircleBackground} cx='37' cy='37' r='31'></circle>
              <circle className={styles.progressCircleForeground} cx='37' cy='37' r='31'></circle>
            </svg>
          </div>
        </div>
      )}
      <div className={styles.children}>{children}</div>
    </div>
  );
};
