import { StyleSheet } from 'react-native';
import { marginTop, padding } from './constants';

export const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'center',
    marginTop: marginTop,
    height: 'auto',
    flexDirection: 'column',
  },
  elementContainer: {
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    padding: padding,
  },
  text: {
    marginTop: marginTop,
  },
  title: {
    alignSelf: 'center',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: marginTop,
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    
  },
});
