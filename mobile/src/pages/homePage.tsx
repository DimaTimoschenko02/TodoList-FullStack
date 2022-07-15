import React, { FC, useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { QUERY_KEYS, ROUTER_KEYS } from "../static";
import TodoList from "../components/MyTodoList";
import { Nav } from "../types/navigationTypes";
import { AuthContext } from "../../App";
import { SearchTodo } from "../components/SearchTodo";
import { useMutation, useQuery, useQueryClient } from "react-query";
import todoService from "../services/TodoService";
import { ITodo } from "../types/todoTypes";

export interface ITodoQuery {
  query: string;
  page?: number
}

export default function HomePage() {
  const navigation = useNavigation<Nav>();
  const authContext = useContext(AuthContext);




  function logout() {
    localStorage.removeItem("token");
    authContext?.handleAuth(false);
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={logout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          (new Date().getFullYear() === 2023)?<SearchTodo/>: null
        }
      
        <TouchableOpacity
          
          onPress={() => {
            navigation.navigate(ROUTER_KEYS.createTodo);
          }}
        >
          <Text>ADD TODO</Text>
        </TouchableOpacity>
        
      </View>
      
      <TodoList/>
      
    </View>
  );
}
