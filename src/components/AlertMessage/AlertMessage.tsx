import type { FC, ReactNode } from 'react';
import { Alert, Slide, Button } from '@mui/material';

type AlertVariant = 'error' | 'warning';

interface AlertMessageProps {
  show: boolean;
  message?: string;
  variant?: AlertVariant;
  action?: ReactNode;
}

const variantStyles: Record<AlertVariant, { bg: string; color: string }> = {
  error: { bg: '#ff5252', color: '#fff' },
  warning: { bg: '#ff9800', color: '#fff' },
};

export const AlertMessage: FC<AlertMessageProps> = ({
  show,
  message = 'Данный контент пока не доступен',
  variant = 'error',
  action,
}) => {
  const styles = variantStyles[variant];

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
          '& .MuiAlert-icon': {
            color: styles.color,
          },
          '& .MuiAlert-action': {
            padding: 0,
            alignItems: 'center',
          },
        }}
      >
        {message}
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
