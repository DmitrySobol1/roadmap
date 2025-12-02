import type { FC } from 'react';
import './Header2.css';

interface Header2Props {
  title?: string;
  subtitle?: string;
}

export const Header2: FC<Header2Props> = ({ title, subtitle }) => {
  return (
    <div className="header2">
      <h1 className="header__title2">{title}</h1>
      <p className="header__subtitle2">{subtitle}</p>
    </div>
  );
};
