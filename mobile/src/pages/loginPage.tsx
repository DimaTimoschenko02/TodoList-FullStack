import { Button, Stack, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import LogSignForm from "../components/Log.SignForm";
import { ROUTER_KEYS } from "../static";
import { Nav } from "../types/navigationTypes";

export default function LoginPage() {
  const navigation = useNavigation<Nav>();
  return (
    <Stack>
      <LogSignForm action="login" />
      <Text>Still no account?</Text>
      <Button
        title="SIGN-UP"
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.signup);
        }}
      />
    </Stack>
  );
}
