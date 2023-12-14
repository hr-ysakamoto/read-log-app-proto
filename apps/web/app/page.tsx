'use client';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import React, { useState } from 'react';
import {
  CoverImage,
  OrderSelectBox,
  ViewMode,
  ViewToggleButton,
} from '../components';
import { SortableContainer } from '../components/SortableContainer';
import { bookList, statusList } from '../lib/mocks';

export default function Page(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [books, setBooks] = useState<{
    [key: string]: string[];
  }>({
    container1: ['A', 'B', 'C'],
    container2: ['D', 'E', 'F'],
    container3: ['G', 'H', 'I'],
    container4: [],
  });

  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in books) {
      return id;
    }
    return Object.keys(books).find((key: string) =>
      books[key]?.includes(id.toString()),
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id.toString();
    setActiveId(id);
    console.log('start!', event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log('over!', event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(undefined);
    console.log('end!', event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Stack spacing="4">
        <Grid templateColumns="repeat(7, 1fr)" gap={4}>
          <GridItem colSpan={3} h="10">
            <Stack direction="row" spacing="2">
              <OrderSelectBox />
              <ViewToggleButton viewMode={viewMode} setViewMode={setViewMode} />
            </Stack>
          </GridItem>
          <GridItem colStart={7} colEnd={8} h="10" justifyContent={'flex-end'}>
            <InputGroup w={300}>
              <Input placeholder="検索" />
              <InputRightElement>
                <SearchIcon color="teal.500" />
              </InputRightElement>
            </InputGroup>
          </GridItem>
        </Grid>
        {statusList.map((state, i) => (
          <SortableContainer
            key={`sortable-container-${i}`}
            id={`sortable-container-${i}`}
            stateName={state.name}
            items={bookList}
          />
        ))}
      </Stack>
      <DragOverlay>
        {activeId ? <CoverImage id={activeId} imageUrl="aa" /> : null}
      </DragOverlay>
    </DndContext>
  );
}
