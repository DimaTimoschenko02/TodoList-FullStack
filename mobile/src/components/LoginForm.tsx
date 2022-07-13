import React, { FC } from 'react';
import { Button, Stack } from '@react-native-material/core';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import { queryClient } from '../../App';
import { QUERY_KEYS  , ROUTER_KEYS} from '../static';
import { styles } from '../styles/Theme';
import { loginSchema } from '../validation/user.validationSchema';
import userService from '../services/UserService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import { RootStackParamList } from '../pages/RootStackPrams';
//import { Home } from '../shared/ROUTER_KEYS';
import MyInput from './ui/MyInput'
import { loginButtonColor } from '../styles/constants';



const LoginForm: FC = () => {
  const navigation = useNavigation();
  const onSuccesMutation = {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.User);
      navigation.navigate(ROUTER_KEYS.home as any);
    },
  };
  const mutationLogin = useMutation(
      userService.login.bind(userService),
      onSuccesMutation,
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        mutationLogin.mutate(values);
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Stack style={styles.formContainer}>
          <MyInput
            label='email'
            onChange={handleChange('email')}
            value={values.email}
            placeholder={'Enter your email'}
            error={errors.email}
          />
          <MyInput
            label='password'
            onChange={handleChange('password')}
            value={values.password}
            placeholder={'Enter your password'}
            error={errors.password}
          />
          <Button
            onPress={() => handleSubmit()}
            color={loginButtonColor}
            title={'Sign in'}
            disabled={!values.email || !values.password}
          />
        </Stack>
      )}
    </Formik>
  );
};

export default LoginForm;