import React from "react";
import { Button, Stack } from "@react-native-material/core";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TodoModel from "../models/TodoModel";
import todoService from "../services/TodoService";
import { useNavigation } from "@react-navigation/native";
import { ROUTER_KEYS, QUERY_KEYS } from "../static/";
import { useMutation } from "react-query";
import { queryClient } from "../../App";
import { Nav } from "../types/navigationTypes";
import MyInput from "../ui/MyInput";
import { validationTodoSchema } from "../validation/todo.validationSchema";

export interface IProps {
  todo: TodoModel | {};
}
export default function UpdateTodo({ todo }: IProps) {
  const navigation = useNavigation<Nav>();
  const updateMutation = useMutation(todoService.updateTodo.bind(todoService), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.Todo);
    },
  })
  
  return (
    <Formik
      initialValues={
        todo instanceof TodoModel
          ? {
              _id: todo.id,
              title: todo.title,
              body: todo.body,
              year: todo.year,
              public: todo.public,
              completed: todo.completed,
            }
          : {
              title: "",
              body: "",
              year: `${new Date().getFullYear()}`,
              public: false,
              completed: false,
            }
      }
      onSubmit={async (values) => {
        updateMutation.mutate(values);
        navigation.navigate(ROUTER_KEYS.home);
      }}
      validationSchema = {validationTodoSchema}
    >
      {({ values, handleChange, setFieldValue, handleSubmit, errors }) => (
        <Stack>
          <MyInput
            label="titile"
            onChange={handleChange("title")}
            value={values.title}
            error={errors.title}
            placeholder={"title"}
          />
          <MyInput
            label="body"
            onChange={handleChange("body")}
            value={values.body}
            error={errors.body}
            placeholder={"todo"}
          />
          <MyInput
            label="year"
            onChange={handleChange("year")}
            value={values.year}
            error={errors.year}
            placeholder={"year"}
          />
          <BouncyCheckbox
            text="completed"
            isChecked={values.completed}
            onPress={() => (values.completed = !values.completed)}
          />
          <BouncyCheckbox
            text="public"
            isChecked={values.public}
            onPress={() => (values.public = !values.public)}
          />

          <Button
            onPress={() => handleSubmit()}
            title={"Update Todo"}
            disabled={
              !values.title || !!errors.body || !!errors.title || !!errors.year
            }
          />
        </Stack>
      )}
    </Formik>
  );
}
