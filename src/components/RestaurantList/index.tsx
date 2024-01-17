import { useState } from 'react';
import { Box, Checkbox, List, ListItem, Icon } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { Restaurant } from '../../models/restaurant';

interface RestaurantsProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantsProps) {
  const [selectedRestaurants, setSelectedRestaurants] = useState<boolean[]>(new Array(restaurants.length).fill(false));

  const handleToggle = (index: number) => {
    const updatedSelection = [...selectedRestaurants];
    updatedSelection[index] = !updatedSelection[index];

    setSelectedRestaurants(updatedSelection);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <List
        dense
        sx={{
          width: '60%',
          maxWidth: '100%',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          overflowY: 'scroll',
        }}
      >
        {restaurants.map((restaurant) => (
          <ListItem
            key={restaurant.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              bgcolor: 'background.paper',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: 1,
              fontWeight: 'bold',
              width: '100%',
              marginTop: 2,
            }}
            disablePadding
          >
            <Checkbox
              checked={selectedRestaurants[restaurant.id] || false}
              onChange={() => handleToggle(restaurant.id)}
            />

            <Box
              component="img"
              sx={{
                height: 267,
                width: 350,
                maxHeight: { xs: 267, md: 243 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt={`Restaurant near you - ${restaurant.restaurantName}`}
              src={restaurant.imgDir}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: { xs: 'center', md: 'flex-start' },
                m: 3,
                minWidth: { md: 350 },
              }}
            >
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

              <Box component="span" sx={{ fontSize: 25 }}>
                {restaurant.restaurantName}
              </Box>
              <Icon>
                <MenuBookIcon />
              </Icon>
            </Box>
            <Box component="span" sx={{ fontSize: 15 }}>
              {restaurant.description}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
