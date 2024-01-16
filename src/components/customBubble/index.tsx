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
}

export const CustomBubble: React.FC<CustomBubbleProps> = ({
  children,
  tailPosition = '50%',
  width = 'auto',
  height = 'auto',
  tailFlip = false,
  backgroundColor = '#FEA82F',
  textAlign = 'left', // 기본 색상 설정
}) => {
  return (
    <Paper
      sx={{
        padding: 2,
        position: 'relative',
        backgroundColor, // 배경 색상 사용
        borderRadius: '16px',
        width, // 너비 설정
        height, // 높이 설정
        textAlign,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: tailPosition, // 꼬리 위치 조정
          width: 0,
          height: 0,
          border: '10px solid transparent',
          borderTopColor: tailFlip ? 'transparent' : backgroundColor, // 여기를 변경
          borderBottom: 'none', // 여기를 변경
          borderLeft: tailFlip ? 'none' : '10px solid transparent',
          borderRight: tailFlip ? '10px solid transparent' : 'none', // 여기를 변경
          borderRightColor: tailFlip ? backgroundColor : 'transparent', // 여기를 변경
          transform: tailFlip ? 'translateY(100%) rotateZ(180deg)' : 'translateY(100%)',
        },
      }}
    >
      {children}
    </Paper>
  );
};
