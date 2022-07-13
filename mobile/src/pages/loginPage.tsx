import { Button, Stack , Text} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import LogSignForm from "../components/Log.SignForm";
import LoginForm from "../components/LoginForm";
import { ROUTER_KEYS } from "../static";
import { styles } from "../styles/Theme";

export default function LoginPage(){
    const navigation = useNavigation()
    return(
        <Stack>
        <LoginForm/>
            <Text>Still no account?</Text>
        <Button
        title="SIGN-UP"
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.signup as any);
        }}
      />
        </Stack>
    )
}