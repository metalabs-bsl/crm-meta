/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './style.module.scss';

export interface Stage {
  title: string;
  type: 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';
  color: string;
}

interface MiniProgressBarProps {
  stages: Stage[];
  currentStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';
  selectedStage: 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';
  onStageClick?: (stageType: 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss') => void;
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ stages, currentStage, selectedStage, onStageClick }) => {
  const currentIndex = stages.findIndex((item) => item.type === currentStage);
  const selectedStageIndex = stages.findIndex((item) => item.type === selectedStage);

  const progressColors = stages.map((stage, index) => (index <= selectedStageIndex ? stages[selectedStageIndex].color : '#e0e0e0'));

  const handleChange = (stageType: any) => {
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
          />
        ))}
      </div>
      <div className={styles.stageTitle}>{stages[currentIndex]?.title}</div>
    </div>
  );
};

export default MiniProgressBar;
