import { Box, Center, Image } from '@chakra-ui/react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface CoverImageProps {
  id: UniqueIdentifier;
  imageUrl: string;
}

export const CoverImage = ({ id, imageUrl }: CoverImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Box id={String(id)}>
        <Center bg="gray.100" h="190px" w="140px" color="white">
          <Image objectFit="cover" src={imageUrl} fit={'fill'} />
          <div>test</div>
        </Center>
      </Box>
    </div>
  );
};
