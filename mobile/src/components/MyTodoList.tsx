import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import todoService from "../services/TodoService";
import { QUERY_KEYS } from "../static/";
import { ITodo } from "../types/todoTypes";
import TodoElement from "./MyTodoItem";


interface ITodoListInputProps {
  data: ITodo[];
  onTodoEdit: (id: string) => void;
  onTodoDelete: (id: string) => void;
  onPagination: () => void;
  dataEnded: boolean
}

interface IRenderItem {
  item: ITodo
}
export default function TodoList() {
  const { isFetching, data } = useQuery(QUERY_KEYS.Todo, () =>
    todoService.getAllTodo()
  );
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient()
  //   const handleTodoEditClick = (id: string) => {
  //     setPage(page => {
  //         page = 1
  //         setDataEnded(false)
  //         navigation.navigate(ROUTER_KEYS.EDIT_TODO, { id: id })
  //         return page
  //     })
  // }
  // const handlePagination = () => {
  //   setPage(page => {
  //       page = page + 1
  //       fetchPaginatedTodos.mutate({query: `${filters}&page=${page}`})
  //       return page
  //   })
  // }

  return (
    <View>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={{ paddingTop: 15 }}
          data={data}
          renderItem={({ item }) => <TodoElement todo={item} />}
        />
      )}
    </View>
  );
}
