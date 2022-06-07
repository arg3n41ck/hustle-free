import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material"
import { PCFieldName } from "./Name"
import { useTranslation } from "next-i18next"

const initialEmptyValues = {
  gender: 0,
}

function Gender({
  open,
  edit,
  onClose,
  name,
  submit,
  defaultValues = initialEmptyValues,
}) {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    gender: yup.mixed().required(tLkOg("validation.required")),
  })

  const { touched, errors, handleChange, values, handleSubmit } = useFormik({
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
      edit={edit}
      onSubmit={handleSubmit}
    >
      <PCFieldName>
        {tLkOg("categoriesOfParticipants.genderParticipants")}
      </PCFieldName>
      <FormControl
        error={touched.gender && Boolean(errors.gender)}
        variant="standard"
      >
        <RadioGroup
          row
          name="gender"
          value={values.gender}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={tLkOg("categoriesOfParticipants.female")}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={tLkOg("categoriesOfParticipants.male")}
          />
        </RadioGroup>
        <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
      </FormControl>
    </ParticipantCategoriesModal>
  )
}

export default Gender
