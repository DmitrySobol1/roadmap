import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { bem } from '@/css/bem.ts';
import './Card.css';

const [b, e] = bem('card');

interface BadgeProps {
  isShown: boolean;
  text: ReactNode;
  color?: string;
}

interface CardProps {
  title: string;
  subtitle?: string;
  badge?: BadgeProps;
  color?: string;
  onClick?: () => void;
  isAccordion?: boolean;
  accordionContent?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  badge,
  color = '#202020',
  onClick,
  isAccordion = false,
  accordionContent,
  isOpen: isOpenControlled,
  onToggle,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const isControlled = isOpenControlled !== undefined;
  const isOpen = isControlled ? isOpenControlled : isOpenInternal;

  const handleSubtitleClick = (e: React.MouseEvent) => {
    if (isAccordion) {
      e.stopPropagation();
      if (isControlled && onToggle) {
        onToggle();
      } else {
        setIsOpenInternal(!isOpenInternal);
      }
    }
  };

  return (
    <div
      className={`${b()} ${isOpen ? 'card--open' : ''}`}
      style={{ backgroundColor: color, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className={e('header')}>
        <div className={e('content')}>
          <div className={e('title')}>{title}</div>
          <div
            className={`${e('subtitle')} ${isAccordion ? 'card__subtitle--clickable' : ''}`}
            onClick={handleSubtitleClick}
          >
            {subtitle}
            {isAccordion && <span className={e('arrow')}>{isOpen ? '∨' : '>'}</span>}
          </div>
        </div>
        {badge?.isShown && (
          <div
            className={e('badge')}
            style={{ backgroundColor: badge.color || '#c8e6c9' }}
          >
            {badge.text}
          </div>
        )}
      </div>
      {isAccordion && (
        <div className={`${e('accordion-content')} ${isOpen ? 'card__accordion-content--open' : ''}`}>
          <div className={e('accordion-inner')}>
            {accordionContent}
          </div>
        </div>
      )}
    </div>
  );
};
