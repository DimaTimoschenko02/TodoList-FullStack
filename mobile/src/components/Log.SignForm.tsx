import React, { FC } from "react";
import { Button, Stack, TextInput } from "@react-native-material/core";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { queryClient } from "../../App";
import { QUERY_KEYS, ROUTER_KEYS } from "../static";
import { styles } from "../styles/Theme";

import userService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";

import MyInput from "./ui/MyInput";
import { loginButtonColor, registerButtonColor } from "../styles/constants";
import { ILoginUser, ISignUser } from "../types/userTypes";
import { loginSchema, signupSchema } from "../validation/user.validationSchema";

type TypeAction = { action: "sign-up" | "login" };
export default function LogSignForm({ action }: TypeAction) {
  console.log({ action });
  const navigation = useNavigation();

  const onSuccessMutation = {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.User);
      navigation.navigate(ROUTER_KEYS.home as any);
      console.log("home");
    },
  };

  const mutationLogin = useMutation(
    userService.login.bind(userService),
    onSuccessMutation
  );
  const mutationSign = useMutation(
    userService.signup.bind(userService),
    onSuccessMutation
  );

  return (
    <Formik
      initialValues={
        action === "login"
          ? {
              email: "",
              password: "",
            }
          : action === "sign-up"
          ? {
              email: "",
              password: "",
              avatar: "",
              confirmPassword: "",
            }
          : {}
      }
      validationSchema={action === "login" ? loginSchema : signupSchema}
      onSubmit={async (values) => {
        action === "login"
          ? mutationLogin.mutate(values as ILoginUser)
          : mutationSign.mutate(values as ISignUser);
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Stack style={styles.formContainer}>
          <MyInput
            label="email"
            onChange={handleChange("email")}
            value={values.email}
            placeholder={"Enter your email"}
            error={errors.email}
          />
          <MyInput
            label="password"
            onChange={handleChange("password")}
            value={values.password}
            placeholder={"Enter your password"}
            error={errors.password}
          />
          {action === "sign-up" ? (
            <Stack >
              <MyInput
                label="confirmPassword"
                onChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                placeholder={"confirmPassword"}
                error={errors.confirmPassword}
              />
              <MyInput
                label="avatar"
                onChange={handleChange("avatar")}
                value={values.avatar}
                placeholder={"photo"}
                error={errors.avatar}
              />
            </Stack>
          ) : null}

          {action === "login" ? (
            <Button
              onPress={() => handleSubmit()}
              color={loginButtonColor}
              title={action.toUpperCase()}
              disabled={!values.email || !values.password}
            />
          ) : (
            <Button
              onPress={() => handleSubmit()}
              color={registerButtonColor}
              title={action.toUpperCase()}
              disabled={!values.email || !values.password || !values.avatar || !values.confirmPassword}
            />
          )}
        </Stack>
      )}
    </Formik>
  );
}
