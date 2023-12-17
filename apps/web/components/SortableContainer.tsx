import { Box, Card, Stack, Text } from '@chakra-ui/react';
import { DraggableImage } from '.';
import { Book } from '../lib';
import { SortableRowStack } from './SortableRowStack';

export interface SortableContainerProps {
  id: string;
  stateName: string;
  items: Book[];
}

export const SortableContainer = ({
  id,
  stateName,
  items,
}: SortableContainerProps) => {
  return (
    <Card variant="outline" size="md">
      <Stack spacing="4" direction={'row'}>
        <Box minH={190} w={120} p={2}>
          <Text fontSize="md">{stateName}</Text>
        </Box>
        <SortableRowStack id={id} items={items}>
          {items.map((book, j) => (
            <DraggableImage
              id={book.id}
              key={`${book.id}-${j}`}
              imageUrl={book.thumbnail}
            />
          ))}
        </SortableRowStack>
      </Stack>
    </Card>
  );
};
