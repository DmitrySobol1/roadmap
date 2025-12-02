import type { FC } from 'react';
import './Text.css';

interface TextProps {
  text?: string;
  hometext?: string;
}

export const Text: FC<TextProps> = ({ text, hometext }) => { 
  return (
    <div className="text">
      <h1 className="text__text">{text}</h1>
      <h1 className="text__hometext">{hometext}</h1>
    </div>
  );
};
