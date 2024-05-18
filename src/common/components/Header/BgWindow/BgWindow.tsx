import { BgCards } from './BgCards/BgCards';
import styles from './styles.module.scss';

import { BG_TYPES } from 'types/enums';

const plains = [BG_TYPES.YELLOW, BG_TYPES.BLUE, BG_TYPES.VIOLET, BG_TYPES.RED, BG_TYPES.BLACK];
const textures = [BG_TYPES.FIRST_TEXTURE, BG_TYPES.SECOND_TEXTURE, BG_TYPES.THIRD_TEXTURE];

export const BgWindow = () => {
  return (
    <div className={styles.bg}>
      <BgCards backgrounds={plains} title='Однотонные' />
      <BgCards backgrounds={textures} title='Текстуры' />
    </div>
  );
};
