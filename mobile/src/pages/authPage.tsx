import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View , TouchableOpacity , Text} from "react-native";
import { ROUTER_KEYS } from "../static";
import { Nav } from "../types/navigationTypes";


export default function AuthPage(){
    const navigation = useNavigation<Nav>()
    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate(ROUTER_KEYS.login)}>
                <Text> LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate(ROUTER_KEYS.signup)}>
                <Text> SIGNUP </Text>
            </TouchableOpacity>

        </View>
    )
}