import { Button } from '@chakra-ui/react';
import React from 'react';

interface IAddTodoBtnProps {
  onClick: () => void;
}

export default function AddNewBtn({ onClick }: IAddTodoBtnProps) {
  return (
    <Button
      px={4}
      py={6}
      onClick={onClick}
      bg="busYellow"
      fontWeight={'medium'}
      borderRadius={'10px'}
      fontSize={'1rem'}
    >
      Add New todo
    </Button>
  );
}
