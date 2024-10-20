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
import { IAddFields, ITodoRes, useUpdateTodo } from '@src/api/todo';
import DateTimePicker from '@src/components/datePicker';
import { useFormik } from 'formik';
import { addTodoSchema } from './add.model';
import { useErrSccToast } from '@src/hooks/useErrSccToast';
import { errorMsg } from '@src/constant/messages';

interface EditModelProps {
  isOpen: boolean;
  onClose: (closeAfterScc?: boolean) => void;
  initialData?: ITodoRes;
}

export default function EditTodoModel({
  isOpen,
  onClose,
  initialData,
}: EditModelProps) {
  const { mutateAsync, isLoading } = useUpdateTodo();
  const { errorToast } = useErrSccToast();

  const onMarkAsDone = async () => {
    try {
      await mutateAsync({ _id: initialData?._id || '', status: 'done' });
      onClose(true);
    } catch (error: any) {
      errorToast(
        errorMsg.errorIn('todo'),
        error?.message || errorMsg.somethingWentWrong,
      );
    }
  };

  const formik = useFormik<IAddFields>({
    initialValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      dateTime: initialData?.dateTime || '',
    },
    validationSchema: addTodoSchema,
    onSubmit: async values => {
      try {
        mutateAsync({ ...values, _id: initialData?._id || '' });
        onClose(true);
      } catch (error: any) {
        errorToast(
          errorMsg.errorIn('todo'),
          error?.message || errorMsg.somethingWentWrong,
        );
      }
    },
  });

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
              onClick={() => onClose()}
              aria-label="Close"
              icon={<CloseIcon />}
            />
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <form
            style={{
              width: '100%',
            }}
            onSubmit={formik.handleSubmit}
          >
            <VStack
              gap={4}
              w={'full'}
              justifyContent={'center'}
              textAlign={'left'}
              alignItems={'flex-start'}
            >
              <VStack w={'full'} alignItems={'flex-start'}>
                <Input
                  placeholder="Name"
                  name="name"
                  value={formik.values.name || ''}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <Text color="error" fontSize="xs">
                    {formik.errors.name}
                  </Text>
                )}
              </VStack>
              <VStack w={'full'} alignItems={'flex-start'}>
                <Input
                  placeholder="Description"
                  name="description"
                  value={formik.values.description || ''}
                  onChange={formik.handleChange}
                />{' '}
                {formik.errors?.description && formik.touched?.description && (
                  <Text color="error" fontSize="xs">
                    {formik.errors.description}
                  </Text>
                )}
              </VStack>
              <VStack w={'full'} alignItems={'flex-start'}>
                <DateTimePicker
                  selectedDate={
                    formik.values.dateTime
                      ? new Date(formik.values.dateTime)
                      : null
                  }
                  setSelectedDate={date =>
                    formik.setFieldValue('dateTime', date)
                  }
                />
                {formik.errors?.dateTime && formik.touched?.dateTime && (
                  <Text color="error" fontSize="xs">
                    {formik.errors.dateTime}
                  </Text>
                )}
              </VStack>
            </VStack>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Flex w={'full'} gap={1} justifyContent="space-between">
            <Button
              px={4}
              py={6}
              width={'full'}
              bg="#B2C3DD"
              fontWeight={'medium'}
              borderRadius={'10px'}
              fontSize={'1rem'}
              onClick={onMarkAsDone}
              isLoading={isLoading}
              isDisabled={
                !formik.isValid || isLoading || initialData?.status === 'done'
              }
            >
              Mark as done
            </Button>
            <Button
              px={4}
              py={6}
              width={'full'}
              bg="busYellow"
              fontWeight={'medium'}
              borderRadius={'10px'}
              fontSize={'1rem'}
              onClick={formik.submitForm}
              isLoading={isLoading}
              isDisabled={
                !formik.isValid || isLoading || initialData?.status === 'done'
              }
            >
              SAVE
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
