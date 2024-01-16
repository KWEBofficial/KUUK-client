import React, { useState } from 'react';
import { Box, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

interface Birthdate {
  year: string;
  month: string;
  day: string;
}
interface BirthdateInputProps {
  onChange: (birthdate: Date) => void;
}
export default function BirthdateInput({ onChange }: BirthdateInputProps) {
  const [birthdate, setBirthdate] = useState<Birthdate>({ year: '', month: '', day: '' });

  const handleInputChange = (e: SelectChangeEvent<string>) => {
    const updatedBirthdate = {
      ...birthdate,
      [e.target.name]: e.target.value,
    };
    setBirthdate(updatedBirthdate);
    if (updatedBirthdate.year && updatedBirthdate.month && updatedBirthdate.day) {
      const newDate = new Date(
        parseInt(updatedBirthdate.year, 10),
        parseInt(updatedBirthdate.month, 10) - 1,
        parseInt(updatedBirthdate.day, 10),
      );
      onChange(newDate); // 부모 컴포넌트로 변경된 날짜 전달
    }
  };
  return (
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
      <FormControl>
        <InputLabel id="year-select-label">년도</InputLabel>
        <Select
          sx={{
            width: 120,
          }}
          labelId="year-select-label"
          name="year"
          value={birthdate.year}
          onChange={handleInputChange}
          label="년도"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="month-select-label">월</InputLabel>
        <Select
          sx={{
            width: 120,
          }}
          labelId="month-select-label"
          name="month"
          value={birthdate.month}
          onChange={handleInputChange}
          label="월"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="day-select-label">일</InputLabel>
        <Select
          sx={{
            width: 100,
          }}
          labelId="day-select-label"
          name="day"
          value={birthdate.day}
          onChange={handleInputChange}
          label="일"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
