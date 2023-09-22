import React from 'react';
import { Todo } from './Todo';

export interface EditableCellProps {
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
    record: Todo;
    index: number;
    children: React.ReactNode;
  }