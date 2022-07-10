import React from "react";
import { Text, Stack } from "@react-native-material/core";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UpdateTodo from "../components/UpdateTodo";

export default function UpdateTodoPage({
  route,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <Stack spacing={3}>
      <Text variant="h5">Update Todo</Text>
      <UpdateTodo todo={route.params || {}} />
    </Stack>
  );
}
