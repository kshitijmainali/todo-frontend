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
import { IAddFields, ITodoRes, useAddTodo } from '@src/api/todo';
import DateTimePicker from '@src/components/datePicker';
import { errorMsg } from '@src/constant/messages';
import { useErrSccToast } from '@src/hooks/useErrSccToast';
import { useFormik } from 'formik';
import * as yup from 'yup';
interface AddModelProps {
  isOpen: boolean;
  onClose: (isSucc?: boolean) => void;
}

export const addTodoSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  dateTime: yup.string().required('Date is required'),
});

export default function AddTodoModel({ isOpen, onClose }: AddModelProps) {
  const { mutateAsync, isLoading } = useAddTodo();

  const { errorToast } = useErrSccToast();

  const formik = useFormik<IAddFields>({
    initialValues: {
      name: '',
      description: '',
      dateTime: '',
    },
    validationSchema: addTodoSchema,
    onSubmit: async values => {
      try {
        await mutateAsync(values);
        onClose();
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
              Add Todo{' '}
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
          <Button
            px={4}
            py={6}
            isLoading={isLoading}
            isDisabled={!formik.isValid || isLoading}
            width={'full'}
            bg="busYellow"
            fontWeight={'medium'}
            borderRadius={'10px'}
            fontSize={'1rem'}
            onClick={formik.submitForm}
          >
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
