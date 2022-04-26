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

const initialEmptyValues = {
  gender: 0,
}

const validationSchema = yup.object({
  gender: yup.mixed().required("Обязательное поле!"),
})

function Gender({
  open,
  edit,
  onClose,
  submit,
  defaultValues = initialEmptyValues,
}) {
  const { touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })
  return (
    <ParticipantCategoriesModal
      open={open}
      title="Пол участников категории"
      onClose={onClose}
      edit={edit}
      onSubmit={handleSubmit}
    >
      <FormControl
        error={touched.gender && Boolean(errors.gender)}
        variant="standard"
      >
        <RadioGroup row name="gender" onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Женский" />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Мужской"
          />
        </RadioGroup>
        <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
      </FormControl>
    </ParticipantCategoriesModal>
  )
}

export default Gender
