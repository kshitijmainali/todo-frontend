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
} from '@chakra-ui/react';
import { ITodoRes } from '@src/api/todo';

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ITodoRes;
}

export default function EditTodoModel({ isOpen, onClose }: EditModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex direction={'row'} justifyContent="flex-end">
            <CloseIcon style={{ width: 'max(30%, 0.5rem)' }} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <VStack
            gap={4}
            height="40vh"
            justifyContent={'center'}
            alignItems="center"
          ></VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            px={4}
            py={6}
            width={'full'}
            bg="busYellow"
            fontWeight={'medium'}
            borderRadius={'10px'}
            fontSize={'1rem'}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
