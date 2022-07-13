import React from "react";
import TodoModel from "../models/TodoModel";
import { useNavigation } from "@react-navigation/native";
import { HStack, Stack, Text, Button } from "@react-native-material/core";
import todoService from "../services/TodoService";
import { useMutation } from "react-query";
import { QUERY_KEYS, ROUTER_KEYS } from "../static/";
import { queryClient } from "../../App";
import { styles } from "../styles/Theme";
//style = {{borderColor: "#acc987" , borderWidth: 2 , borderRadius: 20}}
interface ITodoElement {
  todo: TodoModel;
}

export default function TodoElement({ todo }: ITodoElement) {
  const navigation = useNavigation();
  const mutation = useMutation(todoService.deleteTodo.bind(todoService), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.Todo);
    },
  });
  return (
    <Stack  style= {styles.formContainer} >
      <HStack spacing={20} style={styles.text} >
        <Text  variant="h6" >{todo.title}</Text>
        <Text variant="subtitle2">{todo.year}</Text>
      </HStack>
      <Text variant="subtitle1">{todo.body}</Text>
      <HStack spacing={20}>
        {todo.completed && <Text variant="subtitle1">Completed</Text>}
        <Text variant="subtitle1">{todo.public ? "Public" : "Ptivate"}</Text>
      </HStack>
      <HStack spacing={20}>
        <Button
          title="edit"
          onPress={() => {
            return navigation.navigate(
              ROUTER_KEYS.updateTodo as never,
              todo as never
            );
          }}
        />
        <Button title="delete" onPress={() => mutation.mutate(todo.id)} />
      </HStack>
    </Stack>
  );
}
