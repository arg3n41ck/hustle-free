import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import FileUploaderBig from "../../../../ui/LKui/FileUploaderBig"
import { FormHR, FormSubTitle } from "./EventPeriods"
import { TextField } from "@mui/material"
import { formDataHttp } from "../../../../../helpers/formDataHttp"

const emptyInitialValues = {
  description: "",
  image: null,
}

function EventForm({ defaultValues = emptyInitialValues, eventId }) {
  const {
    touched,
    errors,
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      await formDataHttp(
        {
          description: values.description,
          allFieldsFilled: true,
        },
        `organizer/events/${eventId}/description/`,
        "put"
      )
      await formDataHttp(
        {
          image: values.image,
        },
        `organizer/events/${eventId}/`,
        "patch"
      )
      routerPush(`/lk-og/profile/events/edit/${eventId}/participant-categories/`)
    },
  })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <FileUploaderBig
        error={touched.image && errors.image}
        defaultImage={values.image}
        onChange={(file) => {
          setFieldValue("image", file)
        }}
      />

      <FormHR />
      <FormSubTitle>Описание</FormSubTitle>

      <Field>
        <TextField
          name="description"
          placeholder="Введите описание турнира"
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

const validationSchema = yup.object({
  image: yup.mixed().nullable().required("Обложка турнира обязательное поле!"),
  description: yup.string().required("Обязательное поле!"),
})
