import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useQuery } from "react-query";
import todoService from "../services/TodoService";
import { QUERY_KEYS } from "../static/";
import TodoElement from "./MyTodoItem";

export default function TodoList() {
  const { isFetching, data } = useQuery(
    QUERY_KEYS.Todo,
    todoService.getAllTodo.bind(todoService)
  );
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
