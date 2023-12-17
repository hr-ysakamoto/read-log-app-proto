import { Box, Center, Image } from '@chakra-ui/react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { useStore } from '../lib/zustand';

interface DraggableImageProps {
  id: UniqueIdentifier;
  show?: boolean;
  imageUrl: string;
  style?: React.CSSProperties;
}

export const DraggableImage = ({
  id,
  show,
  imageUrl,
  style,
}: DraggableImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const draggingId = useStore(state => state.draggingItemId);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {show || id !== draggingId ? (
        <Box id={String(id)} mx={2} style={style}>
          <Center bg="gray.100" h="190px" w="140px" color="white">
            <Image objectFit="cover" src={imageUrl} fit="fill" />
          </Center>
        </Box>
      ) : (
        <Box
          id={String(id)}
          mx={2}
          h="190px"
          w="140px"
          borderWidth="1px"
          borderColor="gray.200"
        />
      )}
    </div>
  );
};
