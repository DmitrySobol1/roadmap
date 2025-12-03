import type { FC, ReactNode } from 'react';
import './Header2.css';

interface Header2Props {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
}

export const Header2: FC<Header2Props> = ({ title, subtitle, icon }) => {
  return (
    <div className="header2">
      <div className="header2__title-row">
        {icon && <span className="header2__icon">{icon}</span>}
        <h1 className="header__title2">{title}</h1>
      </div>
      <p className="header__subtitle2">{subtitle}</p>
    </div>
  );
};
