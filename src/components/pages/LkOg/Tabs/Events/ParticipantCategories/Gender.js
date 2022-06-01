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
  name,
  submit,
  defaultValues = initialEmptyValues,
}) {
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
        Пол
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
            label="Женский"
          />
          <FormControlLabel value="male" control={<Radio />} label="Мужской" />
        </RadioGroup>
        <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
      </FormControl>
    </ParticipantCategoriesModal>
  )
}

export default Gender
