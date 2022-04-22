import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  TextField,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSportTypes,
  selectSportTypes,
} from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventForm"
import FileUploaderBig from "../../../../ui/LKui/FileUploaderBig"

const emptyInitialValues = {
  description: "",
  image: null,
}

function EventForm() {
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
      <Field>
        <p className="auth-title__input">Название турнира</p>
        <TextField
          name="description"
          placeholder="Название турнира"
          variant="outlined"
          fullWidth
          multiline
          minRows={5}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
          onChange={handleChange}
          value={values.description}
        />
      </Field>

      <FileUploaderBig />

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

export default EventForm

const validationSchema = yup.object({})
