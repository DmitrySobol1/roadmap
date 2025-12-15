import type { FC, CSSProperties } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  padding?: CSSProperties['padding'];
}

export const Header: FC<HeaderProps> = ({ title, subtitle, padding }) => {
  return (
    <div className="header" style={padding ? { padding } : undefined}>
      <h1 className="header__title">{title}</h1>
      <p className="header__subtitle">{subtitle}</p>
    </div>
  );
};
