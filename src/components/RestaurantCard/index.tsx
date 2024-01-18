import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Restaurant } from '../../models/restaurant';

interface RestaurantsProps {
  restaurants: Restaurant[];
  selectedRestaurants: boolean[];
  setSelectedRestaurants: (newSelectedRestaurants: boolean[]) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RestaurantCard({ restaurants, selectedRestaurants, setSelectedRestaurants }: RestaurantsProps) {
  const [expandedCards, setExpandedCards] = useState<boolean[]>(new Array(restaurants.length).fill(false));

  const handleToggle = (index: number) => {
    const updatedSelection = [...selectedRestaurants];
    updatedSelection[index] = !updatedSelection[index];

    setSelectedRestaurants(updatedSelection);
  };

  const handleExpandClick = (index: number) => {
    const updatedExpanded = [...expandedCards];
    updatedExpanded[index] = !updatedExpanded[index];

    setExpandedCards(updatedExpanded);
  };

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center' }}>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} sx={{ maxWidth: 345, width: 300, margin: '1%' }}>
            <Checkbox
              checked={selectedRestaurants[restaurant.id] || false}
              onChange={() => handleToggle(restaurant.id)}
            />
            <CardHeader
              title={restaurant.restaurantName}
              subheader={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: { xs: 'center', md: 'flex-start' },
                    minWidth: { md: 350 },
                  }}
                >
                  <Box component="span" sx={{ fontSize: 14, mt: 1, bgcolor: '#90EE90', p: 0.7, borderRadius: '8px' }}>
                    {restaurant.location.locationName}
                  </Box>

                  {restaurant.categories.map((category, index) => (
                    <Box component="span" sx={{ fontSize: 14, mt: 1, bgcolor: '#B0E0E6', p: 0.7, borderRadius: '8px' }}>
                      <span key={index}>{category.categoryName}</span>
                    </Box>
                  ))}
                </Box>
              }
            />
            <CardMedia component="img" height="194" image={restaurant.imgDir} alt={restaurant.restaurantName} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {restaurant.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedCards[restaurant.id]}
                onClick={() => handleExpandClick(restaurant.id)}
                aria-expanded={expandedCards[restaurant.id]}
                aria-label={`show more for ${restaurant.restaurantName}`}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedCards[restaurant.id]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Menu:</Typography>
                {restaurant.menus.map((menu) => (
                  <Typography paragraph>
                    {menu.menuName}: {menu.price}원
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
