import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { QUERY_KEYS, ROUTER_KEYS } from "../static";
import TodoList from "../components/MyTodoList";
import { Stack, Button, HStack } from "@react-native-material/core";
import { styles } from "../styles/Theme";
import {
  homeRegisterButtonColor,
  homeLoginButtonColor,
} from "../styles/constants";
import LogSignForm from "../components/Log.SignForm";
import { Nav } from "../types/navigationTypes";
import LoginForm from "../components/LoginForm";


export default function HomePage() {
  const token = localStorage.getItem("token");
  
  const navigation = useNavigation<Nav>();
  console.log('HOME')
  console.log({ token });
  if(!token){
    console.log('home, login')
    return (
      <LoginForm/>
    )
  }
  return(
    <Stack>
      {token && (
        <HStack style={styles.addButton}>
          <Button
            title="add new todo"
            //color={colorOrange}
            onPress={() => {
              return navigation.navigate(ROUTER_KEYS.createTodo);
            }}
          />
        </HStack>
      )}
      {!token && (
        <HStack style={styles.addButton}>
          <Button
            title="Register"
            color={homeRegisterButtonColor}
            onPress={() => {
              return navigation.navigate(ROUTER_KEYS.signup);
            }}
          />
          <Button
            title="Login"
            color={homeLoginButtonColor}
            onPress={() => {
              return navigation.navigate(ROUTER_KEYS.login);
            }}
          />
        </HStack>
      )}
      {token && (
        <HStack style={styles.addButton}>
          <Button
            title="Logout"
            //color={homeLogoutButtonColor}
            onPress={() => {
              navigation.navigate(ROUTER_KEYS.login)
              return localStorage.removeItem('token');
              
            }}
          />
        </HStack>
      )}
      {token && (
        <HStack>
          <TodoList />
        </HStack>
      )}
    </Stack>
  );


  // return (
  //   <Stack>
  //     {token && (
  //       <Stack style={styles.list}>
  //         <Button
  //           title="Create new Todo"
  //           onPress={() => {
  //             navigation.navigate(ROUTER_KEYS.createTodo as any);
  //           }}
  //         />
  //         <TodoList />
  //       </Stack>
  //     )}
  //     {token === null && (
  //       <HStack style={styles.addButton}>
  //         <Button
  //           title="Login"
  //           color={homeLoginButtonColor}
  //           onPress={() => {
  //             return navigation.navigate(ROUTER_KEYS.login as any);
  //           }}
  //         />
  //       </HStack>
  //     )}
  //   </Stack>
  // );





  // if (!(!!token)) {
  //   console.log({token});
  //   return (
  //     <HStack style={styles.addButton}>
  //       <Button
  //         title="SIGN-UP"
  //         color={homeRegisterButtonColor}
  //         onPress={() => {
  //           return navigation.navigate(ROUTER_KEYS.signup as any);
  //         }}
  //       />
  //       <Button
  //         title="Login"
  //         color={homeLoginButtonColor}
  //         onPress={() => {
  //           return navigation.navigate(ROUTER_KEYS.login as any);
  //         }}
  //       />
  //     </HStack>
  //   );
  // }
  // else{
  //   console.log({token})
  //   return (
      
  //     <Stack style={styles.list}>
  //       <Button
  //         title="Create new Todo"
  //         onPress={() => {
  //           navigation.navigate(ROUTER_KEYS.createTodo as any);
  //         }}
  //       />
  //       <TodoList />
  //     </Stack>
  //   );
  // }
    
  
}
