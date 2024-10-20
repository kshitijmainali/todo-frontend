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

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ITodoRes;
}

export default function EditTodoModel({
  isOpen,
  onClose,
  initialData,
}: EditModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex direction={'row'} justifyContent="space-between">
            <Text fontSize={'1.5rem'} fontWeight={'bold'}>
              Edit Todo{' '}
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
            <Input placeholder="Name" value={initialData?.name || ''} />
            <Input
              placeholder="Description"
              value={initialData?.description || ''}
            />
            <DateTimePicker
              selectedDate={
                initialData?.dateTime ? new Date(initialData?.dateTime) : null
              }
              setSelectedDate={() => console.log('first')}
            />
          </VStack>
        </ModalBody>
        <Divider />
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
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
