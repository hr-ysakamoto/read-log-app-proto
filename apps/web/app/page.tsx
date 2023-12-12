"use client";

import {
  Card,
  Stack,
  Box,
  Select,
  IconButton,
  Text,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaListUl } from "react-icons/fa6";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

const bookList = [
  {
    title: "book1",
    author: "author1",
  },
  {
    title: "book2",
    author: "author2",
  },
  {
    title: "book3",
    author: "author3",
  },
  {
    title: "book4",
    author: "author4",
  },
  {
    title: "book5",
    author: "author5",
  },
];

const statusList = [
  {
    id: 1,
    name: "読みたい",
    orderNo: 1,
  },
  {
    id: 2,
    name: "読んでる",
    orderNo: 2,
  },
  {
    id: 3,
    name: "読み終わった",
    orderNo: 3,
  },
];

export default function Page(): JSX.Element {
  return (
    <Stack spacing="4">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem h="12">
          <Stack direction="row" spacing="2">
            <Select placeholder="並び順" w={250}>
              <option value="option1">最近開いた本</option>
              <option value="option2">登録順</option>
              <option value="option3">タイトル</option>
              <option value="option4">出版日</option>
            </Select>
            <IconButton
              isRound={true}
              colorScheme="teal"
              aria-label="Send email"
              icon={<TfiLayoutGrid3Alt />}
            />
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<FaListUl />}
            />
          </Stack>
        </GridItem>
        <GridItem />
        <GridItem>
          <InputGroup>
            <Input placeholder="検索" />
            <InputRightElement>
              <SearchIcon color="teal.500" />
            </InputRightElement>
          </InputGroup>
        </GridItem>
      </Grid>
      {statusList.map((state, i) => (
        <Card variant="outline" key={i} size="md">
          <Stack spacing="4" direction={"row"}>
            <Box w={120} p={2}>
              <Text fontSize="md"> {state.name}</Text>
            </Box>
            {bookList.map((book, j) => (
              <Box key={`book-${i}-${j}`} w="140px" h="200px" bg="gray.300">
                {book.title}
              </Box>
            ))}
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
