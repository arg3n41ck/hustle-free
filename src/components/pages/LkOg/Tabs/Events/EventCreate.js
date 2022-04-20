import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField } from "@mui/material"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSportTypes,
  selectSportTypes,
} from "../../../../../redux/components/sportTypes"

const emptyInitialValues = {
  name: "",
  typeSport: null,
  dateStart: null,
  dateEnd: null,
  timezone: null,
  formatEvent: null,
  statusPublish: null,
  commentForOrganization: null,
  allFieldsFilled: false,
}

function EventCreate() {
  const { touched, errors, values, handleChange, isValid, handleSubmit } =
    useFormik({
      initialValues: emptyInitialValues,
      validationSchema,
      onSubmit: async (values) => {
        alert(JSON.stringify(values, null, 2))
      },
    })

  const [sportTypes] = useSelector(selectSportTypes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  console.log({ errors, touched, values, isValid, sportTypes })
  return (
    <Form onSubmit={handleSubmit}>
      <p className="auth-title__input">Название турнира</p>
      <TextField
        name="name"
        placeholder="Название турнира"
        variant="outlined"
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        onChange={handleChange}
        value={values.name}
      />

      <EventFormFooter>
        <Cancel>Отмена</Cancel>
        <Submit type="submit">Далее</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventCreate

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле").nullable(),
  typeSport: yup.number().required("Обязательное поле").nullable(),
  dateStart: yup.string().required("Обязательное поле").nullable(),
  dateEnd: yup.string().required("Обязательное поле").nullable(),
  timezone: yup.string().required("Обязательное поле").nullable(),
  formatEvent: yup.string().required("Обязательное поле").nullable(),
  statusPublish: yup.string().required("Обязательное поле").nullable(),
  commentForOrganization: yup.string().required("Обязательное поле").nullable(),
})

export const Form = styled.form`
  height: max-content;
  display: flex;
  flex-direction: column;
`

export const EventFormFooter = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column-gap: 16px;
  padding: 32px 0;
`

export const Submit = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  padding: 8px 24px;
`

export const Cancel = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #828282;
  border-radius: 16px;
  padding: 8px 24px;
`
