import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { FieldsRow } from "../EventLocation"
import { TextField } from "@mui/material"
import { PCFieldName } from "./Name"

const initialEmptyValues = {
  fromAge: 0,
  toAge: 0,
}

const validationSchema = yup.object({
  fromAge: yup.mixed().required("Обязательное поле!"),
  toAge: yup.mixed().required("Обязательное поле!"),
})

function Age({ open, edit, name, onClose, submit, defaultValues = initialEmptyValues }) {
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })
  return (
    <ParticipantCategoriesModal
      open={open}
      title={name}
      onClose={onClose}
      onSubmit={handleSubmit}
      edit={edit}
    >
      <PCFieldName>
        Возраст
      </PCFieldName>
      <FieldsRow>
        <TextField
          name="fromAge"
          placeholder="От"
          variant="outlined"
          fullWidth
          type="number"
          error={touched.fromAge && Boolean(errors.fromAge)}
          helperText={touched.fromAge && errors.fromAge}
          onChange={handleChange}
          value={values.fromAge}
        />
        <TextField
          name="toAge"
          placeholder="До"
          variant="outlined"
          fullWidth
          type="number"
          error={touched.toAge && Boolean(errors.toAge)}
          helperText={touched.toAge && errors.toAge}
          onChange={handleChange}
          value={values.toAge}
        />
      </FieldsRow>
    </ParticipantCategoriesModal>
  )
}

export default Age
