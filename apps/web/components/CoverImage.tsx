import { Center, Image } from '@chakra-ui/react'
import React from 'react'

interface CoverImageProps {
  imageUrl: string
}

export const CoverImage = ({ imageUrl }: CoverImageProps) => {
  return (
    <Center bg='gray.100' h='190px' w='140px' color='white'>
      <Image objectFit='cover' src={imageUrl} fit={'fill'} />
    </Center>
  )
}
