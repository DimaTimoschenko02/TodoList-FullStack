import { Button, Stack, Text } from "@react-native-material/core";
import { styles } from "../styles/Theme";
import React from "react";
import LogSignForm from "../components/Log.SignForm";
import { useNavigation } from "@react-navigation/native";
import { ROUTER_KEYS } from "../static";
import { Nav } from "../types/navigationTypes";

export default function SignUpPage() {
  const navigation = useNavigation<Nav>();
  return (
    <Stack style={styles.title}>
      <Text style={styles.text}>SIGN UP</Text>
      <LogSignForm action="sign-up" />
      <Text>Already have an account?</Text>
      <Button
        title="LOGIN"
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.login);
        }}
      />
    </Stack>
  );
}
