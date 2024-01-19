import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  onClick: (() => Promise<void>) | (() => void);
  width?: string | number;
  height?: string | number;
  border?: string;
  color?: 'inherit' | 'primary' | 'secondary';
}

export default function CustomButton({ text, onClick, width, height, border, color }: CustomButtonProps) {
  return (
    <Button
      variant="contained"
      color={color || 'primary'}
      onClick={onClick}
      sx={{ fontWeight: 'bold', width, height, border }}
    >
      {text}
    </Button>
  );
}
