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
  Input,
  Divider,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { ITodoRes } from '@src/api/todo';
import DateTimePicker from '@src/components/datePicker';

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ITodoRes;
}

export default function DeleteTodoModel({
  isOpen,
  onClose,
  initialData,
}: DeleteModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex direction={'row'} justifyContent="space-between">
            <Text fontSize={'1.5rem'} fontWeight={'bold'}>
              Delete todo
            </Text>
            <IconButton
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
            >
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
