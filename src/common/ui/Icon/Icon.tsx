import { CSSProperties } from 'react';
import { IIconType } from 'types/common';
import { icons } from './Icon.helper';

interface IIconProps {
  type: IIconType;
  style?: CSSProperties;
  className?: string;
  title?: string;
  onClick?: () => void;
  alt: string;
}

export const Icon = ({ type, className = '', style = {}, title = '', onClick, alt }: IIconProps) => {
  return <img src={icons[type]} className={className} style={style} title={title} onClick={onClick} alt={alt} />;
};
