import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  VStack,
  ModalFooter,
  Button,
  Divider,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useDeleteTodo } from '@src/api/todo';
import { errorMsg } from '@src/constant/messages';
import { useErrSccToast } from '@src/hooks/useErrSccToast';

interface DeleteModelProps {
  isOpen: boolean;
  filterStatus: string[];
  setFilterStatus: (status: string[]) => void;
  onClose: (isSucc?: boolean) => void;
}

export default function FilterTodoByStatuModel({
  isOpen,
  onClose,
}: DeleteModelProps) {
  const { mutateAsync, isLoading } = useDeleteTodo();

  const { errorToast } = useErrSccToast();

  const onConfirm = async () => {
    try {
      // await mutateAsync(id || '');
      onClose(true);
    } catch (error: any) {
      errorToast(
        errorMsg.errorIn('todo'),
        error?.message || errorMsg.somethingWentWrong,
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex direction={'row'} justifyContent="space-between">
            <Text fontSize={'1.5rem'} fontWeight={'bold'}>
              Delete todo
            </Text>
            <IconButton
              onClick={() => onClose()}
              aria-label="Close"
              icon={<CloseIcon />}
            />
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <VStack gap={4} justifyContent={'center'} alignItems="center">
            <Text fontSize={'1rem'} fontWeight={'bold'}>
              Are you sure you want to delete this todo?
            </Text>
          </VStack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Flex w={'full'} gap={1} justifyContent="space-between">
            <Button
              px={2}
              py={4}
              width={'full'}
              bg="#B2C3DD"
              fontWeight={'medium'}
              borderRadius={'10px'}
              fontSize={'0.8rem'}
              onClick={() => onClose()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              px={2}
              py={4}
              width={'full'}
              bg="busYellow"
              fontWeight={'medium'}
              borderRadius={'10px'}
              fontSize={'0.8rem'}
              onClick={onConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
