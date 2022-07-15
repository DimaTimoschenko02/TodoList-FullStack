import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import todoService from "../services/TodoService";
import { QUERY_KEYS } from "../static";
//import { TodoQuery } from "../types/todoTypes";
import { queryClient } from "../../App";
import MyInput from "./ui/MyInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Input } from "@material-ui/core";
import SearchInput from "./ui/SearchInput";
export function SearchTodo() {
  let [year, setYear] = useState(new Date().getFullYear().toLocaleString());
  let [completed, setCompleted] = useState(false);
  let [search, setSearch] = useState("");

  const { mutate: mutateQuery } = useMutation(
    QUERY_KEYS.Todo,
    (query: TodoQuery) => todoService.getAllTodo(query),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.Todo);
      },
    }
  );

  return (
    <View>
      <SearchInput name="Search" value={search} onChangeText={setSearch} />
      <SearchInput name="year" value={year} onChangeText={setYear} />
      <BouncyCheckbox
        text="completed"
        isChecked={completed}
        onPress={setCompleted}
      />
      <TouchableOpacity
        onPress={() => {
          const query = { search, completed, year };
          setSearch('')
          setCompleted(false)
          setYear(new Date().getFullYear().toLocaleString())
          mutateQuery(query);
        }}
      >
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}
