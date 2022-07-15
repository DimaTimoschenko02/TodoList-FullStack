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



    const [filters, setFilters] = useState<string>('')
    const [page, setPage] = useState(1)
    const [dataEnded, setDataEnded] = useState(false)

    const queryClient = useQueryClient()
    const fetchTodos = useQuery(QUERY_KEYS.Todo, () => todoService.getAllTodo(filters), { 
        refetchOnWindowFocus: false,
    })

    // const deleteTodo = useMutation(({id}: ITodoDeleteQuery) => todoService.deleteTodo(id), {
    //     onSuccess: () => {
    //         queryClient.refetchQueries(TODOS)
    //     }
    // });

    const fetchPaginatedTodos = useMutation(QUERY_KEYS.Todo, ({query}: ITodoQuery) => todoService.getAllTodo(query), {
        onSuccess: (newTodos) => {
            if(newTodos.length <= 5){
                setDataEnded(true)
            }
            queryClient.setQueryData<ITodo[]>(QUERY_KEYS.Todo, (oldTodos) => {
                if(!oldTodos || oldTodos.length === 0) return newTodos
                return [...oldTodos, ...newTodos]
            });
        }
    })

    const fetchFilteredTodos = useMutation(QUERY_KEYS.Todo, (query: string) => todoService.getAllTodo(query), {
        onSuccess: (newData) => {
            queryClient.setQueryData(QUERY_KEYS.Todo, () => newData)
        }
    })

    const handlePagination = () => {
        setPage(page => {
            page = page + 1
            fetchPaginatedTodos.mutate({query: `${filters}&page=${page}`})
            return page
        })
    }

    const handleFiltersSubmit = (query: string) => {
        setPage(page => {
            page = 1
            setFilters(query)
            setDataEnded(false)
            fetchFilteredTodos.mutate(`${query}&page=${page}`)
            return page
        })
    }

  //   const handleLogoutButtonClick = () => {
  //       localStorage.removeItem("token")
  //       authContext?.handleAuth(false)
  //   }

    const handleCreateTodoButtonClick = () => {
        setPage(page => {
            page = 1
            setDataEnded(false)
            navigation.navigate(ROUTER_KEYS.createTodo);
            return page
        })
    }

    const handleTodoEditClick = (id: string) => {
        setPage(page => {
            page = 1
            setDataEnded(false)
            navigation.navigate(ROUTER_KEYS.updateTodo,  id )
            return page
        })
    }

  //   const handleTodoDeleteClick = (id: string) => {
  //       deleteTodo.mutate({id: id})
  //   }
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
