import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Fab, Box, Chip, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

import RestaurantCard from '../../components/RestaurantCard';

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
  const navigate = useNavigate();

  const [locationsAndCategories, setLocationsAndCategories] = useState({
    locations: [],
    categories: [],
  });
  const [checkedLocations, setCheckedLocations] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<boolean[]>([]);

  const [pollName, setPollName] = useState('오늘 뭐먹지?');

  async function getLocationsAndCategories() {
    try {
      const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user/status`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (userResponse.status !== 200) {
        navigate('/');
        toast.error('로그인 상태가 아닙니다');
      }
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
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPollName(value);
  };

  async function makePoll() {
    try {
      const selectedKeys = selectedRestaurants.reduce((acc: number[], isChecked, index) => {
        if (isChecked) {
          acc.push(index);
        }
        return acc;
      }, []);

      const { data: response, status } = await axios.post(
        `${process.env.REACT_APP_API_URL}/poll/restaurant`,
        {
          pollName,
          selectedRestaurants: selectedKeys,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 201) {
        navigate(`/poll/${response}`);
      } else {
        throw new Error();
      }
    } catch {
      console.error('/poll/restaurant 접근에 문제가 있습니다.');
    }
  }

  async function goToVote() {
    try {
      await makePoll();
    } catch (error) {
      console.error('투표창 생성에 문제가 발생하였습니다.');
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            marginTop: '3%',
            width: '60%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" marginRight={1.5}>
            투표방 이름을 설정하세요✨ :{' '}
          </Typography>
          <Input placeholder="투표방 이름" size="medium" value={pollName} onChange={handleInputChange} />
        </Box>
        <FormControl sx={{ m: 1, width: '60%' }}>
          <InputLabel id="location">Location</InputLabel>
          <Select
            labelId="location"
            id="location"
            multiple
            value={checkedLocations}
            onChange={handleChangeLocation}
            input={<OutlinedInput id="location" label="Chip" />}
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
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            multiple
            value={checkedCategories}
            onChange={handleChangeCategory}
            input={<OutlinedInput id="category" label="Chip" />}
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
        <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 20, right: 20 }} onClick={goToVote}>
          <Fab variant="extended" size="medium" color="primary">
            <NavigationIcon sx={{ transform: 'rotate(90deg)', mr: 1 }} />
            투표 시작하기
          </Fab>
        </Box>
        <Box paddingX={3} paddingY={5}>
          <RestaurantCard
            restaurants={restaurants}
            selectedRestaurants={selectedRestaurants}
            setSelectedRestaurants={setSelectedRestaurants}
          />
        </Box>
      </Box>
    </div>
  );
}
