import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { HStack, Select, IconButton, Box, Text } from '@chakra-ui/react';

interface PaginationProps {
  pageSize: number;
  changePazeSize: (queryPageSize: number) => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageIndex: number;
  changePage: (page: number) => void;
  totalpageCount: number;
  totalDataCount: number;
}

const pageOptions = [5, 10, 20, 50];
export const Pagination = ({
  pageSize,
  changePazeSize,
  totalpageCount,
  totalDataCount,
  canNextPage,
  canPreviousPage,
  pageIndex,
  changePage,
}: PaginationProps) => {
  return (
    <Box w="full" pt={5} pb={2}>
      <HStack spacing="60" w="full" justifyContent={'space-between'}>
        <HStack spacing={10} w="full">
          <Text fontSize="sm" fontWeight={'medium'}>
            Showing {pageIndex} of {totalDataCount}
          </Text>
        </HStack>
        <HStack spacing={5} w="full" justifyContent={'flex-end'}>
          <HStack>
            <Box fontSize="sm" fontWeight={'medium'}>
              The page size
            </Box>
            <Select
              value={pageSize}
              onChange={e => changePazeSize(Number(e.target.value))}
              borderColor={'borderColorBlackOpacity'}
              size="sm"
            >
              {pageOptions.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>
          </HStack>
          <IconButton
            aria-label="Search services"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            borderRadius={0}
            py={0}
            borderWidth="0.0625rem"
            borderColor={'borderColorBlackOpacity'}
            isDisabled={!canPreviousPage}
            onClick={() => changePage(pageIndex - 1)}
            icon={<ChevronLeftIcon />}
          />
          <IconButton
            aria-label="Search services"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            py={0}
            fontWeight="medium"
            borderRadius={0}
            borderWidth="0.0625rem"
            borderColor={'borderColorBlackOpacity'}
            onClick={() => changePage(pageIndex + 1)}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
