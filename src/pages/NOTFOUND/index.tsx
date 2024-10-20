import { Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { pageRoutes } from '@src/routes/pageRoutes';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <VStack
      pos={'fixed'}
      zIndex="99"
      color={'black'}
      top={0}
      right={0}
      width="100vw"
      height={'100vh'}
      bg="whiteSecondary"
      fontFamily={'BebasNeueRegular'}
      justify={'center'}
      gap={'2rem'}
    >
      <Text fontWeight={'500'} fontSize={50} fontStyle={'normal'}>
        Page Not Found
      </Text>
      <Button
        type="button"
        px={'8rem'}
        bg={'busYellow'}
        py={'1.875rem'}
        onClick={() => navigate(pageRoutes.dashboard)}
        color={'black'}
      >
        Go Back To Dashboard
      </Button>
    </VStack>
  );
};

export default NotFound;
