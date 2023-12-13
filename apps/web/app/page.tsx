'use client'

import {
  Card,
  Stack,
  Box,
  Image,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Center,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { bookList, statusList } from '../lib/mocks'
import { ViewToggleButton, ViewMode, OrderSelectBox } from '../components'

export default function Page(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  return (
    <Stack spacing='4'>
      <Grid templateColumns='repeat(7, 1fr)' gap={4}>
        <GridItem colSpan={3} h='10'>
          <Stack direction='row' spacing='2'>
            <OrderSelectBox />
            <ViewToggleButton viewMode={viewMode} setViewMode={setViewMode} />
          </Stack>
        </GridItem>
        <GridItem colStart={7} colEnd={8} h='10' justifyContent={'flex-end'}>
          <InputGroup w={300}>
            <Input placeholder='検索' />
            <InputRightElement>
              <SearchIcon color='teal.500' />
            </InputRightElement>
          </InputGroup>
        </GridItem>
      </Grid>
      {statusList.map((state, i) => (
        <Card variant='outline' key={i} size='md'>
          <Stack spacing='4' direction={'row'}>
            <Box w={120} p={2}>
              <Text fontSize='md'> {state.name}</Text>
            </Box>
            {bookList.map((book, j) => (
              <Center
                key={`box-${j}`}
                bg='gray.100'
                h='190px'
                w='140px'
                color='white'
              >
                <Image
                  key={j}
                  objectFit='cover'
                  src={book.thumbnail}
                  fit={'fill'}
                />
              </Center>
            ))}
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}
