import { Button } from '@chakra-ui/react';
import React from 'react';

interface IAddTodoBtnProps {
  onClick: () => void;
  title: string;
}

interface IFilterBtnProps {
  onClick: (status: string) => void;
  title: string;
  value: string;
  isSelected: boolean;
}
export function FilterBtn({
  isSelected,
  onClick,
  title,
  value,
}: IFilterBtnProps) {
  return (
    <Button
      px={4}
      py={6}
      onClick={() => onClick(value)}
      bg={isSelected ? '#B2C3DD' : '#fffce4'}
      fontWeight={'light'}
      borderRadius={'8px'}
      fontSize={'0.8rem'}
    >
      {title}
    </Button>
  );
}

export default function ButtonWithStyle({ onClick }: IAddTodoBtnProps) {
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
