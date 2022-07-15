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

import { THEME } from "./constants/index";

export const Styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        padding: THEME.Spacings.sp10,
        borderRadius: THEME.Spacings.sp5,
        backgroundColor: THEME.Colors.blue,
        marginTop: THEME.Spacings.sp10,
        marginBottom: THEME.Spacings.sp10,
        height: THEME.Size.size40,
        width: THEME.Size.size150
    },
    columnContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: THEME.Colors.white,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
    },
    buttonText: {
        color: THEME.Colors.white,
    },
    topBottomMarginContainer: {
        marginTop: THEME.Spacings.sp5,
        marginBottom: THEME.Spacings.sp5
    },
    errorText: {
        color: THEME.Colors.red
    },
    spreadRowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    paginationButtonContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        padding: THEME.Spacings.sp10,
        borderRadius: THEME.Spacings.sp5,
        backgroundColor: THEME.Colors.grayLight,
        marginTop: THEME.Spacings.sp10,
        marginBottom: THEME.Spacings.sp10,
        height: THEME.Size.size40,
        width: THEME.Size.size150
    },
})
