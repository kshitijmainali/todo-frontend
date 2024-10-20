import { Divider, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundry';
interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return (
    <ErrorBoundary>
      <VStack
        bg={'whiteSecondary'}
        w={'full'}
        h={'100vh'}
        overflowX={'clip'}
        overflowY={'auto'}
        justify={'space-between'}
      >
        <VStack gap={0} w={'full'}>
          {props.children}
        </VStack>
      </VStack>
    </ErrorBoundary>
  );
};

export default Layout;
