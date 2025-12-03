import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { bem } from '@/css/bem.ts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import  { Checkbox } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

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
  lessonsQty?: number;
  isLearned?: boolean;
  badge?: BadgeProps;
  color?: string;
  onClick?: () => void;
  isAccordion?: boolean;
  accordionContent?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isFavorite?: boolean;
  onFavoriteAdd?: () => void;
  onFavoriteRemove?: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  lessonsQty,
  isLearned,
  badge,
  color = '#202020',
  onClick,
  isAccordion = false,
  accordionContent,
  isOpen: isOpenControlled,
  onToggle,
  isFavorite,
  onFavoriteAdd,
  onFavoriteRemove,
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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite && onFavoriteRemove) {
      onFavoriteRemove();
    } else if (!isFavorite && onFavoriteAdd) {
      onFavoriteAdd();
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
          <div className={e('title')}>
            {isLearned && (
              <Checkbox
                checked={true}
                disabled
                sx={{
                  padding: 0,
                  marginRight: '6px',
                  '&.Mui-checked': {
                    color: '#4ade80',
                  },
                  '&.Mui-disabled': {
                    color: '#4ade80',
                  },
                }}
              />
            )}
            {title}
          </div>
          {lessonsQty !== undefined && (
            <div className={e('lessons-qty')}>уроков: {lessonsQty}</div>
          )}
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
          {isFavorite && !isOpen && (
            <div className={e('favorite-indicator')}>
              <Favorite sx={{ fontSize: 16, color: '#ff5252' }} />
            </div>
          )}
        </div>
        {badge?.isShown && (
          <div
            className={`${e('badge-wrapper')} ${onClick ? 'card__badge-wrapper--clickable' : ''} ${onClick && !isPaidContent ? 'card__badge-wrapper--accessible' : ''} ${onClick && isPaidContent ? 'card__badge-wrapper--paid' : ''}`}
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
            {(onFavoriteAdd || onFavoriteRemove) && (
              <div
                className={`${e('favorite-row')} ${isFavorite ? 'card__favorite-row--active' : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? (
                  <>
                    <Favorite sx={{ fontSize: 20, color: '#ff5252' }} />
                    <span className={e('favorite-text')}>В избранном</span>
                    <span className={e('favorite-text-hover')}>Убрать из избранного</span>
                  </>
                ) : (
                  <>
                    <FavoriteBorder sx={{ fontSize: 20, color: '#888' }} />
                    <span className={e('favorite-text')}>Добавить в избранное</span>
                    <span className={e('favorite-text-hover')}>Добавить в избранное</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
