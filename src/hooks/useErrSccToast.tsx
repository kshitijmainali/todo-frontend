import { useToast } from '@chakra-ui/react';

export const useErrSccToast = () => {
  const toast = useToast();

  const errorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const successToast = (title: string, description: string) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return { errorToast, successToast };
};
