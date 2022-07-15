import React, { useState, createContext } from "react";
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
import AuthPage from "./src/pages/authPage";

export const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export interface IAuthContext {
  isAuth: boolean;
  handleAuth: (authState: boolean) => void;
}
export const AuthContext = createContext<IAuthContext | null>(null);



export default function App() {
  
  const [isAuth, setAuth] = useState(
    !!localStorage.getItem("token")
  );
  
  const handleAuth = (auth: boolean) => {
    setAuth(auth);
  };


  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
    <AuthContext.Provider value={{ isAuth, handleAuth }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuth ? (
            <>
              <Stack.Screen name={ROUTER_KEYS.home} component={HomePage} />
              <Stack.Screen
                name={ROUTER_KEYS.createTodo}
                component={CreateTodoPage}
              />
              <Stack.Screen
                name={ROUTER_KEYS.updateTodo}
                component={UpdateTodoPage}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={ROUTER_KEYS.auth}
                component={AuthPage}
              />
              <Stack.Screen
                name={ROUTER_KEYS.signup}
                component={SignUpPage}
              />
              <Stack.Screen name={ROUTER_KEYS.login} component={LoginPage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    </QueryClientProvider>
  );

}
