import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { FieldsRow } from "../EventLocation"
import { TextField } from "@mui/material"
import { useTranslation } from "next-i18next"

const initialEmptyValues = {
  fromAge: 0,
  toAge: 0,
}

function Age({
  open,
  edit,
  onClose,
  submit,
  defaultValues = initialEmptyValues,
}) {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    fromAge: yup.mixed().required(tLkOg("validation.required")),
    toAge: yup.mixed().required(tLkOg("validation.required")),
  })

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
      title={tLkOg("categoriesOfParticipants.agesParticipants")}
      onClose={onClose}
      onSubmit={handleSubmit}
      edit={edit}
    >
      <FieldsRow>
        <TextField
          name="fromAge"
          placeholder={tLkOg("categoriesOfParticipants.from")}
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
          placeholder={tLkOg("categoriesOfParticipants.to")}
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
