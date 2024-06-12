import styles from './style.module.scss';

export interface Stage {
  title: string;
  type: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
  color: string;
}

interface MiniProgressBarProps {
  stages: Stage[];
  currentStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
  selectedStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ stages, currentStage, selectedStage }) => {
  const currentIndex = stages.findIndex((item) => item.type === currentStage);
  const selectedStageIndex = stages.findIndex((item) => item.type === selectedStage);

  return (
    <div className={styles.miniProgressBar}>
      <div className={styles.progressContainer}>
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`${styles.progressStage} ${index <= currentIndex ? styles.active : ''}`}
            style={{
              backgroundColor: index <= selectedStageIndex ? stage.color : '#e0e0e0'
            }}
          ></div>
        ))}
      </div>
      <div className={styles.stageTitle}>{stages[currentIndex].title}</div>
    </div>
  );
};

export default MiniProgressBar;
