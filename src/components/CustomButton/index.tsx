import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  onClick: (() => Promise<void>) | (() => void);
  width?: string | number;
  height?: string | number;
}

export default function CustomButton({ text, onClick, width, height }: CustomButtonProps) {
  return (
    <Button variant="contained" color="primary" onClick={onClick} sx={{ fontWeight: 'bold', width, height }}>
      {text}
    </Button>
  );
}
