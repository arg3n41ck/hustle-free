import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import { FormHR } from "./EventPeriods"
import { useTranslation } from "next-i18next"

const emptyInitialValues = {
  rules: "",
}

function EventCredits() {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    rules: yup.string().required(tLkOg("validation.required")).nullable(),
  })

  const { touched, errors, values, handleChange, handleSubmit, isValid } =
    useFormik({
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
      <p className="auth-title__input">
        {tLkOg("registrationPeriods.maximumNumberOfRegistrations")}: 50
      </p>
      <FormHR />
      <Field>
        <p className="auth-title__input">
          {tLkOg("registrationPeriods.amountOfCredits")}
        </p>
        <TextField
          name="rules"
          placeholder={tLkOg("registrationPeriods.amountOfCredits")}
          variant="outlined"
          fullWidth
          type="number"
          error={touched.rules && Boolean(errors.rules)}
          helperText={touched.rules && errors.rules}
          onChange={handleChange}
          value={values.rules}
        />
      </Field>

      <EventFormFooter>
        <Cancel onClick={() => routerPush("/lk-og/profile/events")}>
          {tLkOg("editEvent.cancel")}
        </Cancel>
        <Submit disabled={!isValid} type="submit">
          {tLkOg("editEvent.further")}
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventCredits
