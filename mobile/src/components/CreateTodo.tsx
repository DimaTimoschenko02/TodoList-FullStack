import React from "react";
import { Button, Stack } from "@react-native-material/core";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import todoService from "../services/TodoService";
import { useNavigation } from "@react-navigation/native";
import { QUERY_KEYS, ROUTER_KEYS } from "../static/";
import { useMutation } from "react-query";
import { queryClient } from "../../App";
import { Nav } from "../types/navigationTypes";
import MyInput from "../ui/MyInput";
import { validationTodoSchema } from "../validation/todo.validationSchema";
import { styles } from "../styles/Theme";

export default function CreateTodo() {
  const navigation = useNavigation<Nav>();

  const addMutation = useMutation(todoService.addTodo.bind(todoService), {
    onSuccess: () => {
      console.log('add')
      queryClient.invalidateQueries(QUERY_KEYS.Todo);
    },
  })
  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
        year: `${new Date().getFullYear()}`,
        public: false,
        completed: false,
      }}
      validationSchema = {validationTodoSchema}
      onSubmit={async (values) => {
        addMutation.mutate(values);
        navigation.navigate(ROUTER_KEYS.home);
      }}
    >
      {({ values, handleChange, setFieldValue, handleSubmit, errors }) => (
        <Stack style={styles.formContainer}>
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
            title={"Add Todo"}
            disabled={
              !values.title || !!errors.body || !!errors.title || !!errors.year
            }
          />
        </Stack>
      )}
    </Formik>
  );
}
// interface IProps{
//   todo: TodoModel | {}
// }

// export default function CreateOrUpdateTodo({ todo }: IProps) {
//   const navigation = useNavigation();
//   const onSuccesMutation = {
//     onSuccess: () => queryClient.invalidateQueries(Todo),
//   };
//   const mutationAdd = useMutation(
//       todoService.addTodo.bind(todoService),
//       onSuccesMutation,
//   );
//   const mutationUpdate = useMutation(
//       todoService.updateTodo.bind(todoService),
//       onSuccesMutation,
//   );

//   return (
//     <Formik
//       initialValues={
//         todo instanceof TodoModel ?
//         {
//           title: todo.title,
//           description: todo.description,
//           year: todo.year,
//           isPublic: todo.isPublic,
//           isCompleted: todo.isCompleted,
//         } :
//         {
//           title: '',
//           description: '',
//           year: new Date().getFullYear(),
//           isPublic: false,
//           isCompleted: false,
//         }
//       }
//       validationSchema={TodoValidationSchema}
//       onSubmit={async (values) => {
//         todo instanceof TodoModel ?
//         mutationUpdate.mutate({ id: todo.id, updatedTodo: values }) :
//         mutationAdd.mutate(values);
//         navigation.navigate(home);
//       }}
//     >

//   );
// }
// Footer
