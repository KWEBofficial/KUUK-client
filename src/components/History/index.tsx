import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';

interface HistoryCardProps {
  navDir: string;
  imgDir: string;
  pollName: string;
  endedAt: Date | null;
}
export default function HistoryCard({ navDir, imgDir, pollName, endedAt }: HistoryCardProps) {
  const navigate = useNavigate();

  function parseDate(date: Date | null): string {
    if (date === null) return '-';
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
        {imgDir === '' && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              top: '30%',
              transform: 'translate(0, -50%)',
              textAlign: 'center',
              whitespace: 'nowrap',
            }}
          >
            <Typography variant="h5" color="primary.main" fontWeight="bold">
              {'< 유찰 >'}
            </Typography>
          </Box>
        )}
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
