import React from "react";
import { Stack, Text } from "@react-native-material/core";
import CreateTodo from "../components/CreateTodo";

export default function CreateTodoPage() {
  return (
    <Stack spacing={3}>
      <Text variant="h5">Create new Todo</Text>
      <CreateTodo />
    </Stack>
  );
}
