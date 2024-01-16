import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';

interface HistoryCardProps {
  navDir: string;
  imgDir: string;
  pollName: string;
  endedAt: Date;
}
export default function HistoryCard({ navDir, imgDir, pollName, endedAt }: HistoryCardProps) {
  const navigate = useNavigate();

  function parseDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${month}월 ${day}일 ${hour}:${min}:${sec}`;
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(navDir)}>
        <CardMedia
          component="div"
          sx={{
            pt: '100%',
          }}
          image={imgDir}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2"> 투표이름 : {pollName} </Typography>
          <Typography variant="body2">종료시점 : {parseDate(endedAt)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
