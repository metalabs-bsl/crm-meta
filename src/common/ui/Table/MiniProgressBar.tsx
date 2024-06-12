import React from 'react';
import styles from './style.module.scss';

export interface Stage {
  title: string;
  type: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
  color: string;
}

type StageClickHandler = (stageType: string) => void;

interface MiniProgressBarProps {
  stages: Stage[];
  currentStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
  selectedStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish';
  onStageClick?: StageClickHandler;
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ stages, currentStage, selectedStage, onStageClick }) => {
  const currentIndex = stages.findIndex((item) => item.type === currentStage);
  const selectedStageIndex = stages.findIndex((item) => item.type === selectedStage);

  const progressColors = stages.map((stage, index) => {
    if (index <= selectedStageIndex) {
      return stages[selectedStageIndex].color;
    } else {
      return '#e0e0e0';
    }
  });

  const handleChange = (stageType: string) => {
    if (onStageClick) {
      onStageClick(stageType);
    }
  };

  return (
    <div className={styles.miniProgressBar}>
      <div className={styles.progressContainer}>
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`${styles.progressStage} ${index <= currentIndex ? styles.active : ''}`}
            style={{ backgroundColor: progressColors[index] }}
            onClick={() => handleChange(stage.type)}
          ></div>
        ))}
      </div>
      <div className={styles.stageTitle}>{stages[currentIndex].title}</div>
    </div>
  );
};

export default MiniProgressBar;
