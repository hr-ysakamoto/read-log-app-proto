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

import React, { useState } from 'react';
import {
  CoverImage,
  OrderSelectBox,
  ViewMode,
  ViewToggleButton,
} from '../components';
import { SortableContainer } from '../components/SortableContainer';
import { Container } from '../lib';
import { containers as containerList } from '../lib/mocks';

export default function Page(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [containers, setContainers] = useState<Container[]>(containerList);

  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [activeUrl, setActiveUrl] = useState<string>();

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

  const handleDragStart = (event: DragStartEvent) => {
    console.log('start!', event);
    const { active } = event;
    const id = active.id.toString();
    setActiveId(id);
    containers.flatMap(container => {
      const book = container.books.find(book => book.id === id);
      if (book) {
        setActiveUrl(book.thumbnail);
      }
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log('over!', event);
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id?.toString();
    //ドロップした場所にあったリソースのid
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

    // ドラッグ、ドロップ時のコンテナ取得
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !(activeContainer && overContainer) ||
      activeContainer.id !== overContainer.id
    ) {
      return;
    }

    // 配列のインデックス取得
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
    setActiveId(undefined);
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
        {/* {containers.map((container, i) => (
          <SortableContainer
            key={`sortable-${i}-${container.id}`}
            id={container.id}
            stateName={container.name}
            items={container.books}
          />
        ))} */}
        <SortableContainer
          id={'container-1'}
          stateName={'to read'}
          items={containers.find(x => x.id === 'container-1')?.books ?? []}
        />
        <SortableContainer
          id={'container-2'}
          stateName={'reading'}
          items={containers.find(x => x.id === 'container-2')?.books ?? []}
        />
        <SortableContainer
          id={'container-3'}
          stateName={'read'}
          items={containers.find(x => x.id === 'container-3')?.books ?? []}
        />
      </Stack>
      <DragOverlay>
        {activeId ? (
          <CoverImage id={activeId} imageUrl={activeUrl ?? ''} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
