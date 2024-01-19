import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { Box, Checkbox } from '@mui/material';

interface HistoryCardProps {
  navDir: string;
  imgDir: string;
  pollName: string;
  endedAt: Date | null;
  onSelectionChange: (newState: boolean) => void;
  isAllSelected: boolean;
  isSelecting: boolean;
}
export default function HistoryCard({
  navDir,
  imgDir,
  pollName,
  endedAt,
  onSelectionChange,
  isAllSelected,
  isSelecting,
}: HistoryCardProps) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  function handleToggle() {
    const newState = !isSelected;
    setIsSelected(newState);
    if (onSelectionChange) {
      onSelectionChange(newState);
    }
  }

  function parseDate(date: Date | null): string {
    if (date === null) return '-';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${month}월 ${day}일 ${hour}:${min}:${sec}`;
  }

  useEffect(() => setIsSelected(isAllSelected), [isAllSelected]);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box>{isSelecting && <Checkbox checked={isSelected} onChange={() => handleToggle()}></Checkbox>}</Box>
      <CardActionArea onClick={() => navigate(navDir)}>
        {endedAt === null && (
          <Box sx={{ position: 'absolute', left: 5, top: 5, backgroundColor: 'primary.main', borderRadius: '20px' }}>
            <Typography
              variant="body2"
              color="primary.contrastText"
              fontWeight="bold"
              sx={{ paddingX: '10px', paddingY: '5px' }}
            >
              투표중
            </Typography>
          </Box>
        )}
        <CardMedia
          component="div"
          sx={{
            pt: '100%',
          }}
          image={imgDir === '' ? '/logo/유찰냥이.png' : imgDir}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2"> 투표이름 : {pollName} </Typography>
          <Typography variant="body2"> 종료시점 : {parseDate(endedAt)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
