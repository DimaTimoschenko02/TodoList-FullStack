import React, { FC } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";


interface IInputProps {
  name: string;
  value: string;
  error?: string;
  numberOfLines?: number;
  multiline?: boolean;
  onChangeText: (text: string) => void;
}

const SearchInput: FC<IInputProps> = ({
  name,
  value,
  error,
  numberOfLines = 1,
  multiline = false,
  onChangeText,
}) => {
  return (
    <View>
      <Text>{name}</Text>
      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={(value) => onChangeText(value)}
        value={value}
      />
      {!!error ? <Text >{error}</Text> : null}
    </View>
  );
};

export default SearchInput

