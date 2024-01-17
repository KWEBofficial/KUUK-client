import React from 'react';
import { Paper } from '@mui/material';

interface CustomBubbleProps {
  children?: React.ReactNode;
  tailPosition?: string; // 꼬리의 위치
  padding?: number;
  width?: string | number; // 말풍선의 너비
  height?: string | number; // 말풍선의 높이
  tailFlip?: boolean; // 꼬리 뒤집기 여부
  backgroundColor?: string;
  textAlign?: 'left' | 'right' | 'center'; // 배경 색상
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
