import { Box } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Book } from '@repo/models/types';
import React from 'react';

export interface SortableRowStackProps {
  id: string;
  items: Book[];
  children: React.ReactNode;
}

export const SortableRowStack = ({
  id,
  items,
  children,
}: SortableRowStackProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <Box ref={setNodeRef} w={500} display="flex" flexDirection="row">
        {children}
      </Box>
    </SortableContext>
  );
};
