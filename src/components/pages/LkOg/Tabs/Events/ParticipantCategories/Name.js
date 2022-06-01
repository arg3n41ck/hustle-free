import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { Field } from "../EventDefaults"
import { TextField } from "@mui/material"
import styled from "styled-components"

const initialEmptyValues = {
  name: "",
}

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле!"),
})

function Name({
  open,
  onClose,
  edit,
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
      title="Название категории"
      onClose={onClose}
      edit={edit}
      onSubmit={handleSubmit}
    >
      <Field>
        <PCFieldName>
          Название категории
        </PCFieldName>
        <TextField
          name="name"
          placeholder="Название категории"
          variant="outlined"
          fullWidth
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          onChange={handleChange}
          value={values.name}
        />
      </Field>
    </ParticipantCategoriesModal>
  )
}

export default Name

export const PCFieldName = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #F2F2F2;
  margin-bottom: 10px;
`
