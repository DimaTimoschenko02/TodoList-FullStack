import { Button, Stack , Text} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ROUTER_KEYS } from "../static";
import { styles } from "../styles/Theme";

export default function LoginPage(){
    const navigation = useNavigation()
    return(
        <Stack>
            
        <Button
        title="SIGN-UP"
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.signup as any);
        }}
      />
        </Stack>
    )
}