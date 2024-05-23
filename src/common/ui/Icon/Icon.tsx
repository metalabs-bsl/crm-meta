import { ImgHTMLAttributes } from 'react';
import { IIconType } from 'types/common';
import { icons } from './Icon.helper';

interface IIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  type: IIconType;
}

export const Icon = ({ type, ...rest }: IIconProps) => {
  return <img src={icons[type]} {...rest} />;
};
