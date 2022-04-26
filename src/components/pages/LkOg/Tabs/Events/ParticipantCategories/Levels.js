import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { Form } from "../EventDefaults"

const initialEmptyValues = {
  levels: [],
}

const validationSchema = yup.object({
  // levels: yup.mixed().test({
  //   test: (array) => array.some((value) => value),
  //   message: "Выберите хотя бы один уровень!",
  // }),
})

function Levels({
  open,
  edit,
  submit,
  onClose,
  defaultValues = initialEmptyValues,
}) {
  const { handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })
  return (
    <ParticipantCategoriesModal
      open={open}
      title="Уровни категории"
      onClose={onClose}
      edit={edit}
      onSubmit={handleSubmit}
    >
      <Form></Form>
    </ParticipantCategoriesModal>
  )
}

export default Levels
