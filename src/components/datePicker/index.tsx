import React, { useState } from 'react';
import { Input, FormControl, FormLabel, Box, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateTimePicker = ({
  selectedDate,
  setSelectedDate,
}: IDatePickerProps) => {
  return (
    <FormControl>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
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
