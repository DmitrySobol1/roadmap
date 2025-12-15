import type { FC, CSSProperties } from 'react';
import './Text.css';

interface TextProps {
  text?: string;
  hometext?: string;
  padding?: CSSProperties['padding'];
}

export const Text: FC<TextProps> = ({ text, hometext, padding }) => {
  return (
    <div className="text" style={padding ? { padding } : undefined}>
      <h1 className="text__text">{text}</h1>
      <h1 className="text__hometext">{hometext}</h1>
    </div>
  );
};
