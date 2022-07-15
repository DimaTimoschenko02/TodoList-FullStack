import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import todoService from "../services/TodoService";
import { QUERY_KEYS } from "../static";
//import { TodoQuery } from "../types/todoTypes";
import { queryClient } from "../../App";
import MyInput from "./ui/MyInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Input } from "@material-ui/core";
import SearchInput from "./ui/SearchInput";
import { TodoQuery } from "../types/todoTypes";
export function SearchTodo() {

  let [year, setYear] = useState(new Date().getFullYear().toLocaleString());
  let [completed, setCompleted] = useState(false);
  let [search, setSearch] = useState("");
  
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient()

  
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
      
      <BouncyCheckbox
        text="completed"
        isChecked={completed}
        onPress={setCompleted}
      />
      <TouchableOpacity
        onPress={() => {
          const query = { search, completed , page };
          setSearch('')
          setCompleted(false)
          setYear(new Date().getFullYear().toLocaleString())
          mutateQuery(query);
        }}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      <Text>Page is {page}</Text>
      <TouchableOpacity
      onPress={() => {
        setPage(page + 1)
        const query = {search , completed , page}
        setCompleted(false)
        setYear(new Date().getFullYear().toLocaleString())
        mutateQuery(query);
      }}
      >
        <Text>MORE</Text>
      </TouchableOpacity>
    </View>
  );
}
