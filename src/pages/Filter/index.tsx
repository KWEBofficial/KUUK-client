import { useEffect, useState } from 'react';
import axios from 'axios';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Box, Chip, FormControl, Input, InputLabel, MenuItem, OutlinedInput } from '@mui/material';

import Restaurants from '../../components/RestaurantList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, filterName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      filterName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export function FilterPage() {
  const [locationsAndCategories, setLocationsAndCategories] = useState({
    locations: [],
    categories: [],
  });
  const [checkedLocations, setCheckedLocations] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState([]);

  async function getLocationsAndCategories() {
    try {
      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll`);
      if (status === 200) {
        setLocationsAndCategories(response);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('위치, 카테고리 정보를 가져오는데 실패했습니다.');
    }
  }

  async function getRestaurants() {
    try {
      const selectedLocationsQuery = checkedLocations.join(',');
      const selectedCategoriesQuery = checkedCategories.join(',');

      const { data: response, status } = await axios.get(`${process.env.REACT_APP_API_URL}/poll/restaurant`, {
        params: {
          locations: selectedLocationsQuery,
          categories: selectedCategoriesQuery,
        },
      });

      if (status === 200) {
        setRestaurants(response);
      } else {
        throw new Error();
      }
    } catch {
      console.error('식당 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getLocationsAndCategories(); // 렌더링 후 한번만 실행
  }, []);

  useEffect(() => {
    getRestaurants();
  }, [checkedLocations, checkedCategories]); // locations, categories가 변할 때 마다 실행

  const theme = useTheme();

  const handleChangeLocation = (event: SelectChangeEvent<typeof checkedLocations>) => {
    const {
      target: { value },
    } = event;
    setCheckedLocations(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeCategory = (event: SelectChangeEvent<typeof checkedCategories>) => {
    const {
      target: { value },
    } = event;
    setCheckedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ marginTop: '3%', width: '60%' }}>
          <Input placeholder="투표방 이름을 설정하세요. " size="medium" />
          <Button sx={{ marginleft: '3%' }}>설정</Button>
        </Box>
        <FormControl sx={{ m: 1, width: '60%' }}>
          <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={checkedLocations}
            onChange={handleChangeLocation}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {locationsAndCategories.locations.map((location, index) => (
              <MenuItem key={index} value={location} style={getStyles(location, checkedLocations, theme)}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: '60%' }}>
          <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={checkedCategories}
            onChange={handleChangeCategory}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {locationsAndCategories.categories.map((category, index) => (
              <MenuItem key={index} value={category} style={getStyles(category, checkedCategories, theme)}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box paddingX={3} paddingY={5}>
          <Restaurants restaurants={restaurants} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <Button>투표 시작하기</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
