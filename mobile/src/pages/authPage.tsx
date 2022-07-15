import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View , TouchableOpacity , Text} from "react-native";
import { ROUTER_KEYS } from "../static";
import { Nav } from "../types/navigationTypes";
import { Styles } from '../styles/Theme'

export default function AuthPage(){
    const navigation = useNavigation<Nav>()
    return (
        <View style = {Styles.columnContainer} >
            <TouchableOpacity style = {Styles.buttonContainer}
            onPress={() => navigation.navigate(ROUTER_KEYS.login)}>
                <Text> LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.buttonContainer}
            onPress={() => navigation.navigate(ROUTER_KEYS.signup)}>
                <Text style = {Styles.buttonContainer}> SIGNUP </Text>
            </TouchableOpacity>

        </View>
    )
}