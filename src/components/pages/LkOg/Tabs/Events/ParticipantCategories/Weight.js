import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { FieldsRow } from "../EventLocation"
import { TextField } from "@mui/material"

const initialEmptyValues = {
  fromWeight: 0,
  toWeight: 0,
}

const validationSchema = yup.object({
  fromWeight: yup.mixed().required("Обязательное поле!"),
  toWeight: yup.mixed().required("Обязательное поле!"),
})

function Weight({
  open,
  edit,
  onClose,
  submit,
  defaultValues = initialEmptyValues,
}) {
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
      edit={edit}
      title="Веса участников категории"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FieldsRow>
        <TextField
          name="fromWeight"
          placeholder="От"
          variant="outlined"
          fullWidth
          type="number"
          error={touched.fromWeight && Boolean(errors.fromWeight)}
          helperText={touched.fromWeight && errors.fromWeight}
          onChange={handleChange}
          value={values.fromWeight}
        />
        <TextField
          name="toWeight"
          placeholder="До"
          variant="outlined"
          fullWidth
          type="number"
          error={touched.toWeight && Boolean(errors.toWeight)}
          helperText={touched.toWeight && errors.toWeight}
          onChange={handleChange}
          value={values.toWeight}
        />
      </FieldsRow>
    </ParticipantCategoriesModal>
  )
}

export default Weight
