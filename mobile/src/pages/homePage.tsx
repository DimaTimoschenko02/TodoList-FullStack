import React, { FC, useContext } from "react";
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
      <SearchTodo/>
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
