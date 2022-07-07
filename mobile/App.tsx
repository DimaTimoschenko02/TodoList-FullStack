import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import {StyleSheet, Text, View} from 'react-native';
import { QueryClient , QueryClientProvider, useQuery } from 'react-query';
import todoService from './src/service/TodoService';
import { Me } from './src/components/Me';

const queryCliet = new QueryClient()


export default function App() {
  
  return (
    <QueryClientProvider client={queryCliet} contextSharing={true}>
      <View style={styles.container}>
      <Text>klol</Text>
      <Me/>
      </View>
      <ReactQueryDevtools initialIsOpen = {false}/>
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
