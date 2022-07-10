import React from 'react';
import { FlatList  , StyleSheet} from 'react-native';
import { useQuery } from 'react-query';
import todoService from '../services/TodoService';
import { QUERY_KEYS } from '../static/';
import TodoElement from './MyTodoItem';

export default function TodoList() {
  const { data } = useQuery(QUERY_KEYS.Todo, todoService.getAllTodo.bind(todoService));
  return (
    <FlatList style = {{paddingTop: 15}}
      data={data}
      renderItem={({ item }) => <TodoElement todo={item} />}
    />
  );
}


