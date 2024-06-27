import { Options } from 'types/pages';
import { IIconType } from 'types/common';

export interface IItem {
  label?: string;
  value?: string;
  type?: string;
  icon?: IIconType;
  options?: Options[];
  items?: IItem[];
}
