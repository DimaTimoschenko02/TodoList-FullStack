import {StatusBar} from 'expo-status-bar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { QueryClient , QueryClientProvider, useQuery } from 'react-query';
import todoService from './src/service/todoServise';

const queryCliet = new QueryClient({
  defaultOptions:{},
})


export default function App() {
  const { data } = useQuery('todo', todoService.getAllTodo.bind(todoService));

  return (
    <QueryClientProvider client={queryCliet}>
      <View style={styles.container}>
      
      <Text>data</Text>
      <StatusBar style="auto" />
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
