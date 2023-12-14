import { Box, Card, Stack, Text } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { CoverImage } from '.';

export interface SortableContainerProps {
  id: string;
  stateName: string;
  items: {
    id: number;
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
        <Box w={120} p={2}>
          <Text fontSize="md"> {stateName}</Text>
        </Box>
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
          <div ref={setNodeRef}>
            <Stack spacing="4" direction={'row'}>
              {items.map((book, j) => (
                <CoverImage
                  id={`cover-image-${id}-${j}`}
                  key={`cover-image-${id}-${j}`}
                  imageUrl={book.thumbnail}
                />
              ))}
            </Stack>
          </div>
        </SortableContext>
      </Stack>
    </Card>
  );
};