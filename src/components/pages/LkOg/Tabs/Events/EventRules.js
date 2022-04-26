import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  TextField,
} from "@mui/material"
import { useDispatch } from "react-redux"
import {
  fetchSportTypes,
} from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"

const emptyInitialValues = {
  rules: "",
}

function EventRules() {
  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])


  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <TextField
          name="rules"
          placeholder="Правила турнира"
          variant="outlined"
          fullWidth
          multiline
          minRows={10}
          error={touched.rules && Boolean(errors.rules)}
          helperText={touched.rules && errors.rules}
          onChange={handleChange}
          value={values.rules}
        />
      </Field>

      <EventFormFooter>
        <Cancel onClick={() => routerPush("/lk-og/profile/events")}>
          Отмена
        </Cancel>
        <Submit disabled={!isValid} type="submit">
          Далее
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventRules

const validationSchema = yup.object({
  rules: yup.string().required("Обязательное поле").nullable(),
})
