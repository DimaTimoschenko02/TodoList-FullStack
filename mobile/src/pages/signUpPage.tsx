import { Stack , Text} from '@react-native-material/core'
import { styles } from '../styles/Theme'
import React from 'react'

export default function signUpPage(){
    return(
        <Stack style = {styles.title}>
            <Text style = {styles.text}>SIGN UP</Text>
        </Stack>
    )
}