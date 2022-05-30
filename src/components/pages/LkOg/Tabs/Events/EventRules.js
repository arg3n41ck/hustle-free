import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import { formDataHttp } from "../../../../../helpers/formDataHttp"
import { useTranslation } from "next-i18next"

const emptyInitialValues = {
  rules: "",
}

function EventRules({ eventId, defaultValues = emptyInitialValues }) {
  const { t: tLkOg } = useTranslation("lkOg")
  const validationSchema = yup.object({
    rules: yup.string().required(tLkOg("validation.required")).nullable(),
  })

  const { touched, errors, values, handleChange, handleSubmit, isValid } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        await formDataHttp(values, `organizer/events/${eventId}/rules/`, "put")
        routerPush(
          `/lk-og/profile/events/edit/${eventId}/participant-categories`
        )
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
          placeholder={tLkOg("tournamentRules.tournamentRules")}
          variant="outlined"
          fullWidth
          multiline
          minRows={10}
          error={touched.rules && Boolean(errors.rules)}
          helperText={touched.rules && errors.rules}
          onChange={handleChange}
          value={values.rules || ""}
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

export default EventRules
