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
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time"
        customInput={
          <Input
            placeholder="Select Date and Time"
            width="100%"
            _hover={{ cursor: 'pointer' }}
          />
        }
      />
    </FormControl>
  );
};

export default DateTimePicker;
