/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './style.module.scss';

type IstageType = 'received' | 'processed' | 'consideration' | 'booking' | 'finish' | 'sale' | 'loss';

export interface Stage {
  title: string;
  type: IstageType;
  color: string;
}

interface MiniProgressBarProps {
  stages: Stage[];
  currentStage: IstageType;
  selectedStage: IstageType;
  onStageClick?: (stageType: IstageType) => void;
  isEditable: boolean;
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ stages, currentStage, selectedStage, onStageClick, isEditable }) => {
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
            style={{ backgroundColor: progressColors[index], cursor: isEditable ? 'pointer' : 'default' }}
            onClick={() => handleChange(stage.type)}
          />
        ))}
      </div>
      <div className={styles.stageTitle}>{stages[currentIndex]?.title}</div>
    </div>
  );
};

export default MiniProgressBar;
