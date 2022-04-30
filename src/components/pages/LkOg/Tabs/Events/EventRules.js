import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import { formDataHttp } from "../../../../../helpers/formDataHttp"

const emptyInitialValues = {
  eventRules: "",
}

function EventRules({ eventId, defaultValues = emptyInitialValues }) {
  const { touched, errors, values, handleChange, handleSubmit, isValid } =
    useFormik({
      initialValues: emptyInitialValues,
      validationSchema,
      onSubmit: async (values) => {
        await formDataHttp(
          values,
          `organizer/events/${eventId}/description/`,
          "put"
        )
        routerPush(`/lk-og/profile/events/edit/${eventId}/participant-categories`)
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
          name="eventRules"
          placeholder="Правила турнира"
          variant="outlined"
          fullWidth
          multiline
          minRows={10}
          error={touched.eventRules && Boolean(errors.eventRules)}
          helperText={touched.eventRules && errors.eventRules}
          onChange={handleChange}
          value={values.eventRules}
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
  eventRules: yup.string().required("Обязательное поле").nullable(),
})
