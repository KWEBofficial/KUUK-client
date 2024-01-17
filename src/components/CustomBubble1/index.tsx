import React from 'react';
import { Paper } from '@mui/material';

interface CustomBubbleProps {
  children?: React.ReactNode;
  tailPosition?: string;
  padding?: number;
  width?: string | number;
  height?: string | number;
  tailFlip?: boolean;
  backgroundColor?: string;
  textAlign?: 'left' | 'right' | 'center';
  textColor?: string;
  fontWeight?: number | 'bold' | 'normal' | 'bolder' | 'lighter';
}

export const CustomBubble: React.FC<CustomBubbleProps> = ({
  children,
  tailPosition = '50%',
  width = 'auto',
  height = 'auto',
  tailFlip = false,
  backgroundColor = 'primary.main',
  textAlign = 'left',
  textColor = 'primary.contrastText',
  fontWeight = 'bold',
}) => {
  return (
    <Paper
      sx={{
        padding: 2,
        position: 'relative',
        backgroundColor,
        borderRadius: '16px',
        width,
        height,
        textAlign,
        color: textColor,
        fontWeight,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: tailPosition,
          width: 0,
          height: 0,
          border: '10px solid transparent',
          borderTopColor: tailFlip ? 'transparent' : backgroundColor,
          borderBottom: 'none',
          borderLeft: tailFlip ? 'none' : '10px solid transparent',
          borderRight: tailFlip ? '10px solid transparent' : 'none',
          borderRightColor: tailFlip ? backgroundColor : 'transparent',
          transform: tailFlip ? 'translateY(100%) rotateZ(180deg)' : 'translateY(100%)',
        },
      }}
    >
      {children}
    </Paper>
  );
};
