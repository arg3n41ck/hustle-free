import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { Field } from "../EventDefaults"
import { FormSubTitle } from "../EventPeriods"
import { Autocomplete, TextField } from "@mui/material"
import styled from "styled-components"
import $api from "../../../../../../services/axios"

const initialEmptyValues = {
  earlyPrice: "",
  standartPrice: "",
  latePrice: "",
  currency: "kzt",
}

const validationSchema = yup.object({
  standartPrice: yup.string().required("Обязательное поле!"),
})

const createPrice = async (values) => {
  try {
    const { data } = await $api.post(
      "/directory/participant_category_price/",
      values
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

function Price({ open, edit, onClose, submit, priceId, eventId }) {
  const { values, setFieldValue, touched, errors, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialEmptyValues,
      validationSchema,
      onSubmit: (values) => {
        if (!priceId) {
          createPrice({ ...values, eventId }).then((data) => {
            submit({ price: data.id })
          })
        }
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
            name="standartPrice"
            placeholder="Цена"
            variant="outlined"
            fullWidth
            type="number"
            error={touched.standartPrice && Boolean(errors.standartPrice)}
            helperText={touched.standartPrice && errors.standartPrice}
            onChange={handleChange}
            value={values.standartPrice}
          />
        </Field>

        <Field>
          <p className="auth-title__input">Поздняя регистрация</p>
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
          <p className="auth-title__input">Валюта</p>
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(_, value) =>
              value && setFieldValue("currency", value.value)
            }
            options={currencyOptions.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={currencyOptions.find(
              ({ value }) => values.currency === value
            )}
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
  { name: "Тенге", value: "kzt" },
  { name: "Доллар", value: "usd" },
  { name: "Евро", value: "eur" },
]

const Form = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
