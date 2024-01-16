import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  onClick: (() => Promise<void>) | (() => void);
}

export default function CustomButton({ text, onClick }: CustomButtonProps) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {text}
    </Button>
  );
}
