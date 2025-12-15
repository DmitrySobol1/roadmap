import type { FC, ReactNode } from 'react';
import { Alert, Slide, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes.ts';

type AlertVariant = 'error' | 'warning' | 'success';

interface AlertMessageProps {
  show: boolean;
  message?: string;
  variant?: AlertVariant;
  action?: ReactNode;
  showButton?: boolean;
}

const variantStyles: Record<AlertVariant, { bg: string; color: string }> = {
  error: { bg: '#ff5252', color: '#000' },
  warning: { bg: '#ff9800', color: '#000' },
  success: { bg: '#4ade80', color: '#000' },
};

export const AlertMessage: FC<AlertMessageProps> = ({
  show,
  message = 'Данный контент доступен на платной подписке',
  variant = 'error',
  action,
  showButton = false,
}) => {
  const styles = variantStyles[variant];
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.MY_ACCOUNT);
  };

  // Показываем кнопку если: это error или явно передан showButton
  const shouldShowButton = variant === 'error' || showButton;

  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <Alert
        severity={variant}
        action={action}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: 0,
          backgroundColor: styles.bg,
          color: styles.color,
          fontFamily: "'Tektur', sans-serif",
          '& .MuiAlert-icon': {
            color: styles.color,
          },
          '& .MuiAlert-action': {
            padding: 0,
            alignItems: 'center',
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div>{message}</div>
          {shouldShowButton && (
            <Button
              size="small"
              onClick={handleButtonClick}
              sx={{
                marginTop: '8px',
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 500,
                fontFamily: "'Tektur', sans-serif",
                textTransform: 'none',
                padding: '6px 16px',
                border: '1px solid #fff',
                '&:hover': {
                  backgroundColor: '#e64a4a',
                  color: 'white',
                  borderColor: 'white'
                },
              }}
            >
              подробнее
            </Button>
          )}
        </div>
      </Alert>
    </Slide>
  );
};

// Компонент кнопки для Alert
interface AlertActionButtonProps {
  onClick: () => void;
  countdown?: number;
  children: ReactNode;
}

export const AlertActionButton: FC<AlertActionButtonProps> = ({
  onClick,
  countdown,
  children,
}) => {
  return (
    <Button
      size="small"
      onClick={onClick}
      sx={{
        color: '#fff',
        fontWeight: 500,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
      }}
    >
      {children} {countdown !== undefined && `(${countdown})`}
    </Button>
  );
};
