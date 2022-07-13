import { Stack , Text} from '@react-native-material/core'
import { styles } from '../styles/Theme'
import React from 'react'
import LogSignForm from '../components/Log.SignForm'

export default function SignUpPage(){
    return(
        <Stack style = {styles.title}>
            <Text style = {styles.text}>SIGN UP</Text>
            <LogSignForm action='sign-up'/>
        </Stack>
    )
}