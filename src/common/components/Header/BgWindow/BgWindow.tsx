import { BgCards } from './BgCards/BgCards';
import styles from './styles.module.scss';

import { BG_TYPES } from 'types/enums';

const plains = [BG_TYPES.PINK, BG_TYPES.VIOLET, BG_TYPES.GREEN, BG_TYPES.GRAY, BG_TYPES.BLACK];
const textures = [
  BG_TYPES.FIRST_TEXTURE,
  BG_TYPES.SECOND_TEXTURE,
  BG_TYPES.THIRD_TEXTURE,
  BG_TYPES.FOURTH_TEXTURE,
  BG_TYPES.FIFTH_TEXTURE,
  BG_TYPES.SIXTH_TEXTURE
];

export const BgWindow = () => {
  return (
    <div className={styles.bg}>
      <BgCards backgrounds={plains} title='Однотонные' />
      <BgCards backgrounds={textures} title='Текстуры' />
    </div>
  );
};
