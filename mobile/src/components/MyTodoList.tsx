import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useQuery } from "react-query";
import todoService from "../services/TodoService";
import { QUERY_KEYS } from "../static/";
import TodoElement from "./MyTodoItem";

export default function TodoList() {
  const { isFetching, data } = useQuery(
    QUERY_KEYS.Todo,
    () =>todoService.getAllTodo() 
  );

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
          data={  data? data: []}
          renderItem={({ item }) => <TodoElement todo={item} />}
        />
      )}
    </View>
  );
}
