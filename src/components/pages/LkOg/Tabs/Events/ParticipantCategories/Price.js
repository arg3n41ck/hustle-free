import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { Field, Form } from "../EventDefaults"
import { FormSubTitle } from "../EventPeriods"
import { Autocomplete, TextField } from "@mui/material"

const initialEmptyValues = {
  earlyPrice: "string",
  standartPrice: "string",
  latePrice: "string",
  currency: "kzt",
}

const validationSchema = yup.object({})

function Price({
  open,
  edit,
  onClose,
  submit,
  defaultValues = initialEmptyValues,
}) {
  const { values, setFieldValue, touched, errors, handleChange, handleSubmit } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: (values) => {
        submit(values)
      },
    })
  return (
    <ParticipantCategoriesModal
      open={open}
      title="Цены регистрации категории"
      onClose={onClose}
      onSubmit={handleSubmit}
      edit={edit}
    >
      <Form>
        <FormSubTitle>Цена</FormSubTitle>

        <Field>
          <p className="auth-title__input">Ранняя регистрация</p>
          <TextField
            name="earlyPrice"
            placeholder="Цена"
            variant="outlined"
            fullWidth
            type="number"
            error={touched.earlyPrice && Boolean(errors.earlyPrice)}
            helperText={touched.earlyPrice && errors.earlyPrice}
            onChange={handleChange}
            value={values.earlyPrice}
          />
        </Field>

        <Field>
          <p className="auth-title__input">Стандартная регистрация</p>
          <TextField
            name="latePrice"
            placeholder="Цена"
            variant="outlined"
            fullWidth
            type="number"
            error={touched.latePrice && Boolean(errors.latePrice)}
            helperText={touched.latePrice && errors.latePrice}
            onChange={handleChange}
            value={values.latePrice}
          />
        </Field>

        <Field>
          <p className="auth-title__input">Поздняя регистрация</p>
          <TextField
            name="earlyPrice"
            placeholder="Цена"
            variant="outlined"
            fullWidth
            type="number"
            error={touched.earlyPrice && Boolean(errors.earlyPrice)}
            helperText={touched.earlyPrice && errors.earlyPrice}
            onChange={handleChange}
            value={values.earlyPrice}
          />
        </Field>

        <Field>
          <p className="auth-title__input">Валюта</p>
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(_, value) =>
              value && setFieldValue("currency", value.value)
            }
            options={currencyOptions.map((option) => option)}
            getOptionLabel={(option) => option.value}
            fullWidth
            value={currencyOptions.find(({ value }) => values.currency)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={touched.currency && Boolean(errors.currency)}
                helperText={touched.currency && errors.currency}
                placeholder="Валюта"
              />
            )}
          />
        </Field>
      </Form>
    </ParticipantCategoriesModal>
  )
}

export default Price

export const currencyOptions = [
  { name: "Тенге", value: "kzd" },
  { name: "Доллар", value: "usd" },
  { name: "Евро", value: "eur" },
]
