import type { FC } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <p className="header__subtitle">{subtitle}</p>
    </div>
  );
};
