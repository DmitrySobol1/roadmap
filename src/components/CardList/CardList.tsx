import type { FC, ReactNode } from 'react';
import './CardList.css';

interface CardListProps {
  children: ReactNode;
}

export const CardList: FC<CardListProps> = ({ children }) => {
  return <div className="card-list">{children}</div>;
};
