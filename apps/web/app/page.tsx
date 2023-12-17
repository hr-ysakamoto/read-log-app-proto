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
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import React, { useId, useState } from 'react';
import {
  DraggableImage,
  OrderSelectBox,
  ViewMode,
  ViewToggleButton,
} from '../components';
import { SortableContainer } from '../components/SortableContainer';
import { Container } from '../lib';
import { containers as containerList } from '../lib/mocks';

type DraggingItem = {
  id: UniqueIdentifier;
  url: string;
};

export default function Page(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [containers, setContainers] = useState<Container[]>(containerList);
  const [draggingItem, setDraggingItem] = useState<DraggingItem>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: UniqueIdentifier): Container | undefined => {
    const targetContainer = containers.find(x => x.id === id);
    if (targetContainer) return targetContainer;

    return containers.find(container => {
      return container.books.some(book => book.id === id);
    });
  };

  const getUrl = (id: UniqueIdentifier): string | undefined => {
    const targetContainer = containers.find(x => x.id === id);
    if (targetContainer) return undefined;

    return containers
      .find(container => {
        return container.books.some(book => book.id === id);
      })
      ?.books.find(book => book.id === id)?.thumbnail;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id.toString();
    const url = getUrl(id) || '';
    setDraggingItem({ id, url });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const id = active.id?.toString();
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (
      !(activeContainer && overContainer) ||
      activeContainer.id === overContainer.id
    ) {
      return;
    }

    setContainers(prev => {
      const activeItems = prev.find(x => x.id === activeContainer.id)?.books; // 移動元のコンテナ
      const overItems = prev.find(x => x.id === overContainer.id)?.books; // 移動先のコンテナ
      if (!(activeItems && overItems)) return prev;
      const activeIndex = activeItems.findIndex(x => x.id === id);
      const overIndex = overItems.findIndex(x => x.id === overId);
      const activeItem = activeItems[activeIndex];
      if (!activeItem) return prev;

      let newIndex: number;
      if (overId in prev.map(x => x.id)) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      const newContainers = prev.flatMap(container => {
        if (container.id === activeContainer.id) {
          return {
            ...container,
            books: container.books.filter(book => book.id !== active.id),
          };
        }
        if (container.id === overContainer.id) {
          return {
            ...container,
            books: [
              ...overItems.slice(0, newIndex),
              activeItem,
              ...overItems.slice(newIndex, overItems.length),
            ],
          };
        }
        return container;
      });
      return newContainers;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const id = active.id.toString();
    const overId = over?.id;
    if (!overId) return;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !(activeContainer && overContainer) ||
      activeContainer.id !== overContainer.id
    ) {
      return;
    }

    const activeIndex = activeContainer.books.findIndex(x => x.id === id);
    const overIndex = overContainer.books.findIndex(x => x.id === overId);

    if (activeIndex !== overIndex) {
      const newContainers = containers.flatMap(container => {
        if (container.id === overContainer.id) {
          return {
            ...container,
            books: arrayMove(overContainer.books, activeIndex, overIndex),
          };
        }
        return container;
      });
      setContainers(newContainers);
    }
    setDraggingItem(undefined);
  };
  const id = useId();

  return (
    <DndContext
      id={id}
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
        {containers.map(container => (
          <SortableContainer
            id={container.id}
            key={container.id}
            stateName={container.name}
            items={container.books}
          />
        ))}
      </Stack>
      <DragOverlay>
        {draggingItem ? (
          <DraggableImage id={draggingItem.id} imageUrl={draggingItem.url} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
