import { Box, Card, Stack, Text } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { CoverImage } from '.';

export interface SortableContainerProps {
  id: string;
  stateName: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    author: string;
    thumbnail: string;
  }[];
}

export const SortableContainer = ({
  id,
  stateName,
  items,
}: SortableContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <Card variant="outline" size="md">
      <Stack spacing="4" direction={'row'}>
        <Box minH={190} w={120} p={2}>
          <Text fontSize="md">{stateName}</Text>
        </Box>
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
          <Box ref={setNodeRef} w={500} display="flex" flexDirection={'row'}>
            {items.map((book, j) => (
              <CoverImage
                id={book.id}
                key={`${book.id}-${j}`}
                imageUrl={book.thumbnail}
              />
            ))}
          </Box>
        </SortableContext>
      </Stack>
    </Card>
  );
};
