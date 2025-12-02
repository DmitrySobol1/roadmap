import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { bem } from '@/css/bem.ts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Card.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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

  const handleToggleAccordion = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpenInternal(!isOpenInternal);
    }
  };

  const handleCardClick = () => {
    if (isAccordion) {
      handleToggleAccordion();
    } else if (onClick) {
      onClick();
    }
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    if (isAccordion && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const isPaidContent = badge?.color === '#ff5252';
  const badgeBackgroundColor = isPaidContent
    ? '#ff5252'
    : isOpen && isAccordion
      ? '#4ade80'
      : (badge?.color || '#c8e6c9');

  return (
    <div
      className={`${b()} ${isOpen ? 'card--open' : ''}`}
      style={{ backgroundColor: color, cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className={e('header')}>
        <div className={e('content')}>
          <div className={e('title')}>{title}</div>
          <div className={`${e('subtitle')} ${isAccordion ? 'card__subtitle--clickable' : ''}`}>
            {subtitle}
            {isAccordion && (
              <KeyboardArrowDownIcon
                className={e('arrow')}
                sx={{
                  fontSize: 20,
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: isOpen ? '#000000' : '#4ade80',
                }}
              />
            )}
          </div>
        </div>
        {badge?.isShown && (
          <div
            className={`${e('badge-wrapper')} ${isAccordion ? 'card__badge-wrapper--clickable' : ''} ${isAccordion && !isPaidContent ? 'card__badge-wrapper--accessible' : ''} ${isAccordion && isPaidContent ? 'card__badge-wrapper--paid' : ''}`}
            onClick={handleBadgeClick}
          >
            <div
              className={e('badge')}
              style={{ backgroundColor: badgeBackgroundColor }}
            >
              {badge.text}
            </div>
          </div>
        )}
      </div>
      {isAccordion && (
        <div className={`${e('accordion-content')} ${isOpen ? 'card__accordion-content--open' : ''}`}>
          <div className={e('accordion-inner')}>
            {accordionContent}
            {onClick && (
              <button
                className={`${e('open-button')} ${isPaidContent ? 'card__open-button--paid' : ''}`}
                onClick={handleBadgeClick}
              >
                Открыть {!isPaidContent && <ArrowForwardIcon sx={{ fontSize: 18 }} />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
