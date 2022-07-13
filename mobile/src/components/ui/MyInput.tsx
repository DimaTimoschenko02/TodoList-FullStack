import React from 'react';
import { TextInput } from '@react-native-material/core';

interface IInputProps {
    label: string;
    onChange?: (e: string | React.ChangeEvent<any>) => void;
    value: string | undefined;
    placeholder? : string;
    error?: string
}

export default function MyInput({ label, ...props }: IInputProps) {
  return (
    <TextInput
      label={label}
      value={!!props.value ? props.value : '' }
      onChangeText={props.onChange}
      placeholder={props.placeholder}
      helperText={props.error}
      color={!!props.error ? 'error' : 'primary'}
    />
  );
}