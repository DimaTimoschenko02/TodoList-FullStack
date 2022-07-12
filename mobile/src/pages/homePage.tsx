import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTER_KEYS } from "../static";
import TodoList from "../components/MyTodoList";
import { Stack, Button } from "@react-native-material/core";
import { styles } from "../styles/Theme";

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <Stack style={styles.list}>
      <Button
        title="Create new Todo"
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.createTodo as never);
        }}
      />
      <TodoList />
    </Stack>
  );
}
