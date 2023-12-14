import { Select } from '@chakra-ui/react';
import React from 'react';

export const OrderSelectBox = () => {
  return (
    <Select placeholder="並び順" w={250}>
      <option value="option1">最近開いた本</option>
      <option value="option2">登録順</option>
      <option value="option3">タイトル</option>
      <option value="option4">出版日</option>
    </Select>
  );
};
