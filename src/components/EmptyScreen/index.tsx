import { Box, Text, VStack } from '@chakra-ui/react';
import { EmptyScreenIcon } from '@src/assets/icons';
import React from 'react';

interface IEmptyScreenProps {
  title: string;
  description: string;
}

export default function EmptyScreen({ description, title }: IEmptyScreenProps) {
  return (
    <VStack
      w={'full'}
      gap={4}
      justifyContent="center"
      alignItems={'center'}
      h="full"
    >
      <Box>
        <EmptyScreenIcon />
      </Box>
      <VStack gap={2}>
        <Box>
          <Text fontSize={'md'} fontWeight={'medium'}>
            {title}
          </Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} fontWeight={'normal'}>
            {description}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
}
