import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ReactQueryDevtools } from "react-query/devtools";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTER_KEYS } from "./src/static/";
import HomePage from "./src/pages/homePage";
import UpdateTodoPage from "./src/pages/updateTodoPage";
import CreateTodoPage from "./src/pages/createTodoPage";
import LoginPage from "./src/pages/loginPage";
import SignUpPage from "./src/pages/signUpPage";

const Stack = createNativeStackNavigator();
export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={ROUTER_KEYS.home} component={HomePage} />
          <Stack.Screen name={ROUTER_KEYS.createTodo} component={CreateTodoPage} />
          <Stack.Screen name={ROUTER_KEYS.updateTodo} component={UpdateTodoPage} />
          <Stack.Screen name={ROUTER_KEYS.login} component={LoginPage} />
          <Stack.Screen name={ROUTER_KEYS.signup} component={SignUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}


