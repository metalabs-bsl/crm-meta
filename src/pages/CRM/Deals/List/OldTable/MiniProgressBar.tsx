// import React, { useState } from 'react';
// import { IStageData } from '../types/types';
// import styles from './style.module.scss';

// interface MiniProgressBarProps {
//   stages: IStageData[];
//   currentStage: string;
//   isEditable?: boolean;
//   onStageChange?: (stageId: string) => void;
// }

// const MiniProgressBar: React.FC<MiniProgressBarProps> = ({ stages, currentStage, isEditable = false, onStageChange }) => {
//   const currentIndex = stages.findIndex((stage) => stage.id === currentStage);
//   const [selectedStage, setSelectedStage] = useState(currentStage);
//   const [selectedColor, setSelectedColor] = useState(stages[currentIndex]?.color || '#e0e0e0');

//   const handleStageClick = (stageId: string, color: string) => {
//     if (isEditable && onStageChange) {
//       setSelectedStage(stageId);
//       setSelectedColor(color);
//       onStageChange(stageId);
//     }
//   };

//   return (
//     <div className={styles.miniProgressBar}>
//       <div className={styles.progressContainer}>
//         {stages.map((stage, index) => (
//           <div
//             key={stage.id}
//             className={`${styles.progressStage} ${index <= currentIndex ? styles.active : ''} ${stage.id === selectedStage ? styles.selected : ''}`}
//             style={{
//               backgroundColor: index <= stages.findIndex((s) => s.id === selectedStage) ? selectedColor : '#e0e0e0',
//               cursor: isEditable ? 'pointer' : 'default'
//             }}
//             onClick={() => handleStageClick(stage.id, stage.color)}
//           />
//         ))}
//       </div>
//       <div className={styles.stageTitle}>{stages.find((stage) => stage.id === selectedStage)?.name}</div>
//     </div>
//   );
// };

// export default MiniProgressBar;
export {};
