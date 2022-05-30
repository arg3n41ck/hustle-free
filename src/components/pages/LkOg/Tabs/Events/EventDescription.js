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
import { useTranslation } from "next-i18next"

const emptyInitialValues = {
  description: "",
  image: null,
}

function EventForm({ defaultValues = emptyInitialValues, eventId }) {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    image: yup.mixed().nullable().required(tLkOg("validation.coverValid")),
    description: yup.string().required(tLkOg("validation.required")),
  })

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
      typeof (values.image || "") !== "string" &&
        (await formDataHttp(
          {
            image: values.image,
          },
          `organizer/events/${eventId}/`,
          "patch"
        ))
      routerPush(`/lk-og/profile/events/edit/${eventId}/rules/`)
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
      <FormSubTitle>{tLkOg("coverAndDescription.description")}</FormSubTitle>

      <Field>
        <TextField
          name="description"
          placeholder={tLkOg("coverAndDescription.descriptionPlaceholder")}
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
          {tLkOg("editEvent.cancel")}
        </Cancel>
        <Submit disabled={!isValid} type="submit">
          {tLkOg("editEvent.further")}
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventForm
