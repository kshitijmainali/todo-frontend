import React, { useState } from 'react';
import { Input, FormControl, FormLabel, Box, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (selectedDate: Date | null) => void;
}

const DateTimePicker = ({
  selectedDate,
  setSelectedDate,
}: IDatePickerProps) => {
  return (
    <FormControl w={'full'}>
      <Box display="flex" alignItems="center">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select Date and Time"
          minDate={new Date()}
          customInput={
            <Input
              placeholder="Select Date and Time"
              width="100%"
              _hover={{ cursor: 'pointer' }}
            />
          }
        />
      </Box>
    </FormControl>
  );
};

export default DateTimePicker;
